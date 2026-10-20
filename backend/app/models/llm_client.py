
import json
import logging
import re

from app.core.config import settings

logger = logging.getLogger(__name__)

GOOGLE_MODEL = "gemini-flash-latest"

_google_client = None
_google_client_mode = None


def _get_google_client():
    """Create a Gemini client lazily using the configured API key."""
    global _google_client, _google_client_mode

    api_key = settings.GOOGLE_API_KEY
    if not api_key:
        return None

    if _google_client is None:
        try:
            from google import genai

            _google_client = genai.Client(api_key=api_key)
            _google_client_mode = "genai"
        except Exception:
            try:
                import google.generativeai as google_generativeai

                google_generativeai.configure(api_key=api_key)
                _google_client = (
                    google_generativeai.GenerativeModel("gemini-1.5-flash")
                )
                _google_client_mode = "generativeai"
            except Exception:
                logger.exception("Unable to initialize a Gemini client.")
                _google_client = None
                _google_client_mode = None

    return _google_client


def _clean_json(text: str) -> str:
    """Remove Markdown code fences from a model response."""
    text = (text or "").strip()

    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z0-9_-]*\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    return text.strip()


def _generate_text(prompt: str) -> str:
    """Generate text with the available Gemini SDK."""
    client = _get_google_client()

    if client is None:
        return ""

    try:
        if _google_client_mode == "genai":
            response = client.models.generate_content(
                model=GOOGLE_MODEL,
                contents=prompt,
            )
        elif _google_client_mode == "generativeai":
            response = client.generate_content(prompt)
        else:
            return ""

        return (getattr(response, "text", None) or "").strip()

    except Exception:
        logger.exception("Gemini text generation failed.")
        return ""


def gemini_generate_json(prompt: str) -> dict:
    """Generate and parse a JSON object without crashing on API failures."""
    raw = _generate_text(prompt)

    if not raw:
        return {
            "error": (
                "Gemini is unavailable or not configured. "
                "Check GOOGLE_API_KEY and the API quota."
            ),
            "raw": "",
        }

    cleaned = _clean_json(raw)

    try:
        result = json.loads(cleaned)

        if not isinstance(result, dict):
            return {
                "error": "Gemini returned JSON in an unexpected format.",
                "raw": raw,
            }

        return result

    except json.JSONDecodeError:
        logger.warning("Gemini returned invalid JSON.")
        return {
            "error": "Invalid JSON returned by LLM.",
            "raw": raw,
        }


def generate(prompt: str) -> str:
    """Backward-compatible text generation helper for the RAG service."""
    raw = _generate_text(prompt)

    if not raw:
        logger.warning(
            "Gemini is unavailable; returning a fallback response."
        )
        return "LLM service is not configured or is temporarily unavailable."

    return raw
