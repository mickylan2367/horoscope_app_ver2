import os
import re

from openai import OpenAI

_client = None


def get_openai_client():
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def plain_text_ai_reply(text, max_chars=None):
    text = re.sub(r"```(?:\w+)?\n?([\s\S]*?)```", r"\1", text or "")
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+[.)]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"[*_`]+", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()
    if max_chars and len(text) > max_chars:
        clipped = text[:max_chars]
        sentence_end = max(
            clipped.rfind("。"),
            clipped.rfind("！"),
            clipped.rfind("？"),
            clipped.rfind("."),
            clipped.rfind("!"),
            clipped.rfind("?"),
        )
        if sentence_end >= max_chars * 0.45:
            return clipped[: sentence_end + 1].strip()
        return clipped.rstrip("、, \n") + "..."
    return text
