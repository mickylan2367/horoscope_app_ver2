import json
from unittest.mock import patch

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from .memory import cosine_similarity, search_diary_chunks
from .models import Diary, DiaryMemoryChunk


class DiarySecondSelfTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="diary-user", password="pass12345")
        self.other = User.objects.create_user(username="other-user", password="pass12345")
        self.diary = Diary.objects.create(
            user=self.user,
            title="2026-05-01",
            date="2026-05-01",
            content="I felt calm after drawing The Star and taking a walk.",
        )

    def test_cosine_similarity_scores_matching_vectors(self):
        self.assertEqual(cosine_similarity([1, 0], [1, 0]), 1)
        self.assertEqual(cosine_similarity([1, 0], [0, 1]), 0)

    @patch("diaryapp.memory.embed_text", return_value=[1.0, 0.0])
    def test_reindex_creates_chunks(self, mocked_embed):
        self.client.force_login(self.user)

        response = self.client.post(reverse("api_diary_second_self_reindex"), data="{}", content_type="application/json")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["chunkCount"], 1)
        self.assertEqual(DiaryMemoryChunk.objects.filter(user=self.user, diary=self.diary).count(), 1)
        mocked_embed.assert_called_once()

    @patch("diaryapp.memory.embed_text", return_value=[1.0, 0.0])
    def test_search_diary_chunks_is_scoped_to_user(self, mocked_embed):
        DiaryMemoryChunk.objects.create(
            user=self.user,
            diary=self.diary,
            chunk_index=0,
            source_date=self.diary.date,
            source_title=self.diary.title,
            text="The Star walk",
            text_hash="hash",
            embedding=[1.0, 0.0],
        )
        other_diary = Diary.objects.create(user=self.other, title="Other", date="2026-05-02", content="private")
        DiaryMemoryChunk.objects.create(
            user=self.other,
            diary=other_diary,
            chunk_index=0,
            source_date=other_diary.date,
            source_title=other_diary.title,
            text="Other private text",
            text_hash="hash",
            embedding=[1.0, 0.0],
        )

        results = search_diary_chunks(self.user, "star", limit=5)

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["diaryId"], self.diary.pk)

    @patch("diaryapp.views.generate_second_self_reply", return_value="You remembered the walk.")
    @patch("diaryapp.views.search_diary_chunks", return_value=[{"date": "2026-05-01", "text": "The Star walk"}])
    @patch("diaryapp.views.ensure_user_diary_index", return_value={"chunkCount": 1})
    def test_second_self_chat_returns_references(self, mocked_ensure, mocked_search, mocked_reply):
        self.client.force_login(self.user)

        response = self.client.post(
            reverse("api_diary_second_self_chat"),
            data=json.dumps({"message": "What did I feel after the card?"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["reply"], "You remembered the walk.")
        self.assertEqual(data["references"][0]["text"], "The Star walk")
        mocked_ensure.assert_called_once_with(self.user)
