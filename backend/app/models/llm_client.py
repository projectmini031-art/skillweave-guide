import os
import json
import re
from dotenv import load_dotenv
from google import genai
import time
load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise RuntimeError("❌ GOOGLE_API_KEY not found in environment")

client = genai.Client(api_key=API_KEY)

MODEL_NAME = "models/gemini-flash-latest"


def _clean_json(text: str) -> str:
    """
    Removes ```json ... ``` or ``` ... ``` wrappers if present
    """
    text = text.strip()

    # Remove triple backtick blocks
    if text.startswith("```"):
        text = re.sub(r"^```[a-zA-Z]*", "", text)
        text = re.sub(r"```$", "", text)

    return text.strip()




def gemini_generate_json(prompt: str):
    """Generate JSON using Gemini without crashing on API failures."""

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )

        raw = response.text

        if not raw or not raw.strip():
            return {
                "error": "Gemini returned an empty response."
            }

        cleaned = _clean_json(raw)

        try:
            result = json.loads(cleaned)

            if not isinstance(result, dict):
                return {
                    "error": "Gemini returned JSON in an unexpected format."
                }

            return result

        except json.JSONDecodeError:
            return {
                "error": "Gemini returned invalid JSON."
            }

    except Exception as exc:
        error_message = str(exc).lower()

        if "429" in error_message or "resource_exhausted" in error_message:
            print("Gemini daily quota exhausted. Using fallback learning path.")
            return {
                "error": "Gemini API quota exhausted."
            }

        print(f"Gemini API request failed: {exc}")

        return {
            "error": "Gemini is temporarily unavailable."
        }
