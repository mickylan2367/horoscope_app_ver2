import json
from datetime import date, time
from unittest.mock import patch

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import (
    HoroscopeProfile,
    TarotCard,
    TarotConsultMessage,
    TarotConsultSession,
    TarotDeck,
    TarotReading,
    TarotReadingCard,
)


class HoroscopeProfileApiTests(TestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username="owner", password="pass12345")
        self.other = User.objects.create_user(username="other", password="pass12345")
        self.profile = HoroscopeProfile.objects.create(
            user=self.owner,
            is_public=False,
            person_name="Alice",
            place="Tokyo",
            birth_date=date(1990, 1, 1),
            birth_time=time(10, 30),
            lat=35.6762,
            lon=139.6503,
        )

    def test_profile_update_endpoint_updates_owned_profile(self):
        self.client.force_login(self.owner)

        response = self.client.post(
            reverse("api_chart_profile_update"),
            data=json.dumps(
                {
                    "profileId": self.profile.id,
                    "personName": "Alice Edited",
                    "place": "Osaka",
                    "birthDate": "1991-02-03",
                    "birthTime": "14:20",
                    "lat": 34.6937,
                    "lon": 135.5023,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)

        self.profile.refresh_from_db()
        self.assertEqual(self.profile.person_name, "Alice Edited")
        self.assertEqual(self.profile.place, "Osaka")
        self.assertEqual(self.profile.birth_date, date(1991, 2, 3))
        self.assertEqual(self.profile.birth_time, time(14, 20))
        self.assertEqual(self.profile.lat, 34.6937)
        self.assertEqual(self.profile.lon, 135.5023)

    def test_profile_update_endpoint_rejects_other_user_profile(self):
        self.client.force_login(self.other)

        response = self.client.post(
            reverse("api_chart_profile_update"),
            data=json.dumps(
                {
                    "profileId": self.profile.id,
                    "personName": "Hacker",
                    "place": "Kyoto",
                    "birthDate": "1991-02-03",
                    "birthTime": "14:20",
                    "lat": 35.0116,
                    "lon": 135.7681,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 403)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.person_name, "Alice")


class TarotApiTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tarot-user", password="pass12345")
        self.deck = TarotDeck.objects.create(
            name="Test Tarot",
            slug="test-tarot",
            is_system=True,
            deck_type=TarotDeck.DECK_TYPE_TAROT,
            allow_reversed=True,
        )
        for index, name in enumerate(["The Fool", "The Magician", "The Star"]):
            TarotCard.objects.create(
                deck=self.deck,
                name=name,
                arcana=TarotCard.ARCANA_MAJOR,
                suit=TarotCard.SUIT_NONE,
                number=index,
                order=index,
                keywords=["test"],
                upright_meaning=f"{name} upright",
                reversed_meaning=f"{name} reversed",
            )

    def test_tarot_decks_endpoint_exposes_system_deck(self):
        response = self.client.get(reverse("api_tarot_decks"))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["systemDecks"][0]["name"], "Test Tarot")
        self.assertEqual(data["systemDecks"][0]["cardCount"], 3)

    def test_tarot_draw_saves_snapshot(self):
        self.client.force_login(self.user)

        response = self.client.post(
            reverse("api_tarot_reading_draw"),
            data=json.dumps(
                {
                    "deckId": self.deck.pk,
                    "spreadType": "one_card",
                    "question": "What now?",
                    "allowReversed": False,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertEqual(data["question"], "What now?")
        self.assertEqual(len(data["cards"]), 1)
        self.assertTrue(data["cards"][0]["meaning"].endswith("upright"))
        self.assertEqual(TarotReading.objects.filter(user=self.user).count(), 1)

    @patch("chart.views.generate_ai_tarot_interpretation", return_value="カードは静かに答えています。")
    def test_tarot_draw_can_include_ai_interpretation(self, mocked_generate):
        self.client.force_login(self.user)

        response = self.client.post(
            reverse("api_tarot_reading_draw"),
            data=json.dumps(
                {
                    "deckId": self.deck.pk,
                    "spreadType": "one_card",
                    "question": "Should I wait?",
                    "allowReversed": False,
                    "includeAi": True,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        data = response.json()
        reading = TarotReading.objects.get(pk=data["id"])
        self.assertEqual(data["aiInterpretation"], "カードは静かに答えています。")
        self.assertEqual(reading.ai_interpretation, "カードは静かに答えています。")
        mocked_generate.assert_called_once()

    def test_tarot_limit_removes_oldest_unpinned_reading(self):
        self.client.force_login(self.user)
        old_reading = TarotReading.objects.create(user=self.user, deck=self.deck, question="old")
        for index in range(49):
            TarotReading.objects.create(user=self.user, deck=self.deck, question=f"keep {index}", is_pinned=index < 2)

        response = self.client.post(
            reverse("api_tarot_reading_draw"),
            data=json.dumps({"deckId": self.deck.pk, "spreadType": "one_card"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(TarotReading.objects.filter(user=self.user).count(), 50)
        self.assertFalse(TarotReading.objects.filter(pk=old_reading.pk).exists())

    def test_tarot_limit_rejects_when_all_readings_are_pinned(self):
        self.client.force_login(self.user)
        for index in range(50):
            TarotReading.objects.create(user=self.user, deck=self.deck, question=f"pinned {index}", is_pinned=True)

        response = self.client.post(
            reverse("api_tarot_reading_draw"),
            data=json.dumps({"deckId": self.deck.pk, "spreadType": "one_card"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(TarotReading.objects.filter(user=self.user).count(), 50)

    def test_user_can_create_update_and_delete_tarot_deck(self):
        self.client.force_login(self.user)

        create_response = self.client.post(
            reverse("api_tarot_decks"),
            data=json.dumps(
                {
                    "name": "My Oracle",
                    "description": "Personal symbols",
                    "deckType": "oracle",
                    "allowReversed": False,
                    "isPublic": True,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(create_response.status_code, 201)
        self.assertFalse(create_response.json()["isPublic"])
        deck_id = create_response.json()["id"]

        update_response = self.client.put(
            reverse("api_tarot_deck_detail", args=[deck_id]),
            data=json.dumps(
                {
                    "name": "My Oracle Edited",
                    "description": "Updated",
                    "deckType": "oracle",
                    "allowReversed": False,
                    "isPublic": True,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.json()["name"], "My Oracle Edited")
        self.assertFalse(update_response.json()["isPublic"])

        delete_response = self.client.delete(reverse("api_tarot_deck_detail", args=[deck_id]))

        self.assertEqual(delete_response.status_code, 200)
        self.assertFalse(TarotDeck.objects.filter(pk=deck_id).exists())

    def test_user_can_create_update_and_delete_tarot_card(self):
        self.client.force_login(self.user)
        deck = TarotDeck.objects.create(user=self.user, name="Mine", deck_type=TarotDeck.DECK_TYPE_ORACLE)

        create_response = self.client.post(
            reverse("api_tarot_card_create"),
            data=json.dumps(
                {
                    "deckId": deck.pk,
                    "name": "Blue Door",
                    "arcana": "oracle",
                    "keywords": ["door"],
                    "uprightMeaning": "A threshold appears.",
                    "reversedMeaning": "",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(create_response.status_code, 201)
        card_id = create_response.json()["id"]

        update_response = self.client.put(
            reverse("api_tarot_card_detail", args=[card_id]),
            data=json.dumps(
                {
                    "name": "Blue Door Edited",
                    "arcana": "oracle",
                    "keywords": ["door", "choice"],
                    "uprightMeaning": "A clearer threshold appears.",
                    "reversedMeaning": "",
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.json()["name"], "Blue Door Edited")

        delete_response = self.client.delete(reverse("api_tarot_card_detail", args=[card_id]))

        self.assertEqual(delete_response.status_code, 200)
        self.assertFalse(TarotCard.objects.filter(pk=card_id).exists())

    def test_other_user_cannot_edit_private_tarot_deck_or_card(self):
        other = User.objects.create_user(username="intruder", password="pass12345")
        deck = TarotDeck.objects.create(user=self.user, name="Private Deck", deck_type=TarotDeck.DECK_TYPE_ORACLE)
        card = TarotCard.objects.create(
            deck=deck,
            user=self.user,
            name="Private Card",
            arcana=TarotCard.ARCANA_ORACLE,
            upright_meaning="Private",
        )
        self.client.force_login(other)

        deck_response = self.client.put(
            reverse("api_tarot_deck_detail", args=[deck.pk]),
            data=json.dumps({"name": "Nope"}),
            content_type="application/json",
        )
        card_response = self.client.delete(reverse("api_tarot_card_detail", args=[card.pk]))

        self.assertEqual(deck_response.status_code, 404)
        self.assertEqual(card_response.status_code, 404)

    @patch("chart.views.search_diary_chunks", return_value=[{"date": "2026-05-01", "text": "A diary note."}])
    @patch("chart.views.ensure_user_diary_index", return_value={"chunkCount": 1})
    @patch("chart.views.generate_ai_tarot_consult_reply", return_value="The card asks you to pause.")
    def test_tarot_consult_uses_owned_reading_context(self, mocked_generate, mocked_ensure, mocked_search):
        self.client.force_login(self.user)
        reading = TarotReading.objects.create(
            user=self.user,
            deck=self.deck,
            spread_type=TarotReading.SPREAD_ONE_CARD,
            question="What should I notice?",
            ai_interpretation="A quiet message.",
        )
        TarotReadingCard.objects.create(
            reading=reading,
            card=self.deck.cards.first(),
            position=1,
            position_label="Message",
            is_reversed=False,
            card_name_snapshot="The Fool",
            meaning_snapshot="A first step.",
        )

        response = self.client.post(
            reverse("api_tarot_reading_consult", args=[reading.pk]),
            data=json.dumps({"message": "What is the smallest next step?"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["reply"], "The card asks you to pause.")
        self.assertEqual(data["readingId"], reading.pk)
        self.assertEqual(data["references"]["question"], "What should I notice?")
        self.assertEqual(data["references"]["cards"][0]["name"], "The Fool")
        self.assertEqual([message["role"] for message in data["messages"]], ["user", "assistant"])
        self.assertEqual(TarotConsultSession.objects.filter(user=self.user, reading=reading).count(), 1)
        self.assertEqual(TarotConsultMessage.objects.count(), 2)
        self.assertEqual(data["diaryReferences"][0]["text"], "A diary note.")
        mocked_generate.assert_called_once()
        mocked_ensure.assert_called_once_with(self.user)
        mocked_search.assert_called_once()

    @patch("chart.views.search_diary_chunks", return_value=[])
    @patch("chart.views.ensure_user_diary_index", return_value={"chunkCount": 0})
    @patch("chart.views.generate_ai_tarot_consult_reply", return_value="A saved reply.")
    def test_tarot_consult_get_returns_saved_history(self, mocked_generate, mocked_ensure, mocked_search):
        self.client.force_login(self.user)
        reading = TarotReading.objects.create(user=self.user, deck=self.deck, question="Saved question")

        post_response = self.client.post(
            reverse("api_tarot_reading_consult", args=[reading.pk]),
            data=json.dumps({"message": "Please remember this."}),
            content_type="application/json",
        )
        self.assertEqual(post_response.status_code, 200)

        get_response = self.client.get(reverse("api_tarot_reading_consult", args=[reading.pk]))

        self.assertEqual(get_response.status_code, 200)
        data = get_response.json()
        self.assertEqual(data["session"]["title"], "Saved question")
        self.assertEqual([message["content"] for message in data["messages"]], ["Please remember this.", "A saved reply."])
        mocked_generate.assert_called_once()

    def test_tarot_consult_rejects_empty_message(self):
        self.client.force_login(self.user)
        reading = TarotReading.objects.create(user=self.user, deck=self.deck, question="Question")

        response = self.client.post(
            reverse("api_tarot_reading_consult", args=[reading.pk]),
            data=json.dumps({"message": "   "}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)

    def test_tarot_consult_rejects_other_user_reading(self):
        other = User.objects.create_user(username="other-reader", password="pass12345")
        reading = TarotReading.objects.create(user=other, deck=self.deck, question="Private")
        self.client.force_login(self.user)

        response = self.client.post(
            reverse("api_tarot_reading_consult", args=[reading.pk]),
            data=json.dumps({"message": "Can I ask?"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 404)
