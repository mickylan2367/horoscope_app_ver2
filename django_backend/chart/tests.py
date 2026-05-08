import json
from datetime import date, time
from unittest.mock import patch

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import HoroscopeProfile, TarotCard, TarotDeck, TarotReading


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
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(create_response.status_code, 201)
        deck_id = create_response.json()["id"]

        update_response = self.client.put(
            reverse("api_tarot_deck_detail", args=[deck_id]),
            data=json.dumps(
                {
                    "name": "My Oracle Edited",
                    "description": "Updated",
                    "deckType": "oracle",
                    "allowReversed": False,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.json()["name"], "My Oracle Edited")

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
