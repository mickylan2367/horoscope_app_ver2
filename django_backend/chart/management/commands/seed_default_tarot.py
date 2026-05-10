import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from chart.models import TarotCard, TarotDeck


class Command(BaseCommand):
    help = "Seed or update the default tarot deck and its 78 cards."

    def handle(self, *args, **options):
        data_path = Path(__file__).resolve().parents[2] / "data" / "default_tarot.json"
        with data_path.open("r", encoding="utf-8") as tarot_file:
            payload = json.load(tarot_file)

        deck_payload = payload["deck"]
        cards_payload = payload["cards"]

        with transaction.atomic():
            deck, _ = TarotDeck.objects.update_or_create(
                slug=deck_payload["slug"],
                is_system=True,
                defaults={
                    "user": None,
                    "name": deck_payload["name"],
                    "description": deck_payload.get("description", ""),
                    "deck_type": deck_payload.get("deck_type", TarotDeck.DECK_TYPE_TAROT),
                    "allow_reversed": bool(deck_payload.get("allow_reversed", True)),
                },
            )

            seen_names = set()
            for card_payload in cards_payload:
                seen_names.add(card_payload["name"])
                TarotCard.objects.update_or_create(
                    deck=deck,
                    name=card_payload["name"],
                    defaults={
                        "user": None,
                        "arcana": card_payload["arcana"],
                        "suit": card_payload.get("suit", TarotCard.SUIT_NONE),
                        "number": card_payload.get("number"),
                        "keywords": card_payload.get("keywords", []),
                        "upright_meaning": card_payload["upright_meaning"],
                        "reversed_meaning": card_payload.get("reversed_meaning", ""),
                        "image_url": card_payload.get("image", ""),
                        "order": card_payload["order"],
                    },
                )

            TarotCard.objects.filter(deck=deck, user__isnull=True).exclude(name__in=seen_names).delete()

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(cards_payload)} cards for {deck.name}."))
