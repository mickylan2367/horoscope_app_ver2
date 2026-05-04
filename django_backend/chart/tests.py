import json
from datetime import date, time

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .models import HoroscopeProfile


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
