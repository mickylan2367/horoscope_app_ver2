from django.db import models
from django.contrib.auth.models import User

class HoroscopeResult(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="chart_results",
    )
    cache_key = models.CharField(max_length=255)
    result_json = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    # "geo": result_geo,
    # "helio": result_helio,
    # "ai_text_geo": ai_text_geo,
    # "ai_text_helio":ai_text_helio,
    # "chart_url": chart_geo_url,

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["cache_key"],
                condition=models.Q(user__isnull=True),
                name="unique_public_chart_result_cache_key",
            ),
            models.UniqueConstraint(
                fields=["user", "cache_key"],
                condition=models.Q(user__isnull=False),
                name="unique_private_chart_result_user_cache_key",
            ),
        ]




class HoroscopeProfile(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="chart_profiles",
    )
    is_public = models.BooleanField(default=False, db_index=True)
    person_name = models.CharField(max_length=100)
    place = models.CharField(max_length=200)
    birth_date = models.DateField()
    birth_time = models.TimeField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lon = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.person_name


class TarotDeck(models.Model):
    DECK_TYPE_TAROT = "tarot"
    DECK_TYPE_ORACLE = "oracle"
    DECK_TYPE_CHOICES = [
        (DECK_TYPE_TAROT, "Tarot"),
        (DECK_TYPE_ORACLE, "Oracle"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tarot_decks",
    )
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, blank=True)
    description = models.TextField(blank=True)
    deck_type = models.CharField(max_length=20, choices=DECK_TYPE_CHOICES, default=DECK_TYPE_TAROT)
    is_system = models.BooleanField(default=False, db_index=True)
    is_public = models.BooleanField(default=False, db_default=False, db_index=True)
    allow_reversed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_system", "name", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["slug"],
                condition=models.Q(is_system=True),
                name="unique_system_tarot_deck_slug",
            ),
        ]

    def __str__(self):
        return self.name


class TarotCard(models.Model):
    ARCANA_MAJOR = "major"
    ARCANA_MINOR = "minor"
    ARCANA_ORACLE = "oracle"
    ARCANA_CHOICES = [
        (ARCANA_MAJOR, "Major Arcana"),
        (ARCANA_MINOR, "Minor Arcana"),
        (ARCANA_ORACLE, "Oracle"),
    ]

    SUIT_NONE = "none"
    SUIT_CUPS = "cups"
    SUIT_PENTACLES = "pentacles"
    SUIT_SWORDS = "swords"
    SUIT_WANDS = "wands"
    SUIT_CHOICES = [
        (SUIT_NONE, "None"),
        (SUIT_CUPS, "Cups"),
        (SUIT_PENTACLES, "Pentacles"),
        (SUIT_SWORDS, "Swords"),
        (SUIT_WANDS, "Wands"),
    ]

    deck = models.ForeignKey(TarotDeck, on_delete=models.CASCADE, related_name="cards")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tarot_cards",
    )
    name = models.CharField(max_length=120)
    arcana = models.CharField(max_length=20, choices=ARCANA_CHOICES)
    suit = models.CharField(max_length=20, choices=SUIT_CHOICES, default=SUIT_NONE, blank=True)
    number = models.IntegerField(null=True, blank=True)
    keywords = models.JSONField(default=list, blank=True)
    upright_meaning = models.TextField()
    reversed_meaning = models.TextField(blank=True)
    image = models.ImageField(upload_to="tarot_cards/%Y/%m/", blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["deck_id", "order", "id"]

    def __str__(self):
        return self.name


class TarotReading(models.Model):
    SPREAD_ONE_CARD = "one_card"
    SPREAD_THREE_CARD = "three_card"
    SPREAD_CUSTOM = "custom"
    SPREAD_CHOICES = [
        (SPREAD_ONE_CARD, "One Card"),
        (SPREAD_THREE_CARD, "Three Card"),
        (SPREAD_CUSTOM, "Custom"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tarot_readings")
    deck = models.ForeignKey(
        TarotDeck,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="readings",
    )
    spread_type = models.CharField(max_length=20, choices=SPREAD_CHOICES, default=SPREAD_ONE_CARD)
    question = models.TextField(blank=True)
    ai_interpretation = models.TextField(blank=True, default="", db_default="")
    memo = models.TextField(blank=True)
    is_pinned = models.BooleanField(default=False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return f"{self.user_id} {self.spread_type} {self.created_at:%Y-%m-%d}"


class TarotReadingCard(models.Model):
    reading = models.ForeignKey(TarotReading, on_delete=models.CASCADE, related_name="cards")
    card = models.ForeignKey(
        TarotCard,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reading_cards",
    )
    position = models.PositiveIntegerField()
    position_label = models.CharField(max_length=80, blank=True)
    is_reversed = models.BooleanField(default=False)
    card_name_snapshot = models.CharField(max_length=120)
    meaning_snapshot = models.TextField()
    image_snapshot = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ["position"]
        constraints = [
            models.UniqueConstraint(fields=["reading", "position"], name="unique_tarot_reading_card_position"),
        ]

    def __str__(self):
        return f"{self.reading_id}:{self.position}:{self.card_name_snapshot}"
