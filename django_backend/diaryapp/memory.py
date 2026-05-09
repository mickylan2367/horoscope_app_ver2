import hashlib
import math
import os
import re

from openai import OpenAI

from .models import Diary, DiaryMemoryChunk


EMBEDDING_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")
CHUNK_SIZE = 1200
CHUNK_OVERLAP = 160

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def normalize_diary_text(text):
    return re.sub(r"\s+", " ", text or "").strip()


def diary_text_hash(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def chunk_diary_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    text = normalize_diary_text(text)
    if not text:
        return []

    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end].strip())
        if end == len(text):
            break
        start = max(end - overlap, start + 1)
    return [chunk for chunk in chunks if chunk]


def embed_text(text):
    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=text,
    )
    return response.data[0].embedding


def index_diary(diary, force=False):
    chunks = chunk_diary_text(diary.content)
    normalized = normalize_diary_text(diary.content)
    content_hash = diary_text_hash(normalized)

    existing = DiaryMemoryChunk.objects.filter(diary=diary)
    if (
        not force
        and existing.exists()
        and existing.count() == len(chunks)
        and not existing.exclude(text_hash=content_hash, embedding_model=EMBEDDING_MODEL).exists()
    ):
        return {"created": 0, "skipped": existing.count()}

    existing.delete()
    created = 0
    for index, chunk in enumerate(chunks):
        DiaryMemoryChunk.objects.create(
            user=diary.user,
            diary=diary,
            chunk_index=index,
            source_date=diary.date,
            source_title=diary.title,
            text=chunk,
            text_hash=content_hash,
            embedding=embed_text(chunk),
            embedding_model=EMBEDDING_MODEL,
            token_estimate=max(1, len(chunk) // 4),
        )
        created += 1
    return {"created": created, "skipped": 0}


def reindex_user_diaries(user, force=True):
    if force:
        DiaryMemoryChunk.objects.filter(user=user).delete()

    created = 0
    skipped = 0
    for diary in Diary.objects.filter(user=user).order_by("date", "id"):
        result = index_diary(diary, force=force)
        created += result["created"]
        skipped += result["skipped"]
    return {
        "diaryCount": Diary.objects.filter(user=user).count(),
        "chunkCount": DiaryMemoryChunk.objects.filter(user=user).count(),
        "created": created,
        "skipped": skipped,
        "embeddingModel": EMBEDDING_MODEL,
    }


def ensure_user_diary_index(user):
    created = 0
    skipped = 0
    for diary in Diary.objects.filter(user=user).order_by("date", "id"):
        normalized = normalize_diary_text(diary.content)
        if not normalized:
            DiaryMemoryChunk.objects.filter(diary=diary).delete()
            continue
        current_hash = diary_text_hash(normalized)
        existing = DiaryMemoryChunk.objects.filter(diary=diary)
        if existing.exists() and not existing.exclude(text_hash=current_hash, embedding_model=EMBEDDING_MODEL).exists():
            skipped += existing.count()
            continue
        result = index_diary(diary, force=True)
        created += result["created"]
        skipped += result["skipped"]
    return {
        "diaryCount": Diary.objects.filter(user=user).count(),
        "chunkCount": DiaryMemoryChunk.objects.filter(user=user).count(),
        "created": created,
        "skipped": skipped,
        "embeddingModel": EMBEDDING_MODEL,
    }


def cosine_similarity(left, right):
    if not left or not right or len(left) != len(right):
        return 0.0
    dot = sum(a * b for a, b in zip(left, right))
    left_norm = math.sqrt(sum(a * a for a in left))
    right_norm = math.sqrt(sum(b * b for b in right))
    if not left_norm or not right_norm:
        return 0.0
    return dot / (left_norm * right_norm)


def diary_chunk_payload(chunk, score=None):
    payload = {
        "id": chunk.pk,
        "diaryId": chunk.diary_id,
        "diary_id": chunk.diary_id,
        "date": chunk.source_date.isoformat() if chunk.source_date else "",
        "title": chunk.source_title,
        "text": chunk.text,
    }
    if score is not None:
        payload["score"] = score
    return payload


def search_diary_chunks(user, query, limit=4):
    query = normalize_diary_text(query)
    if not query:
        return []

    query_embedding = embed_text(query)
    scored = []
    chunks = DiaryMemoryChunk.objects.filter(user=user, embedding_model=EMBEDDING_MODEL).select_related("diary")
    for chunk in chunks:
        score = cosine_similarity(query_embedding, chunk.embedding)
        if score > 0:
            scored.append((score, chunk))
    scored.sort(key=lambda item: item[0], reverse=True)
    return [diary_chunk_payload(chunk, score=score) for score, chunk in scored[:limit]]
