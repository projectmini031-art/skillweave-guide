
# app/services/rag_reasoner.py

from urllib.parse import urlparse

from app.models.rag_retriever import retrieve_docs
from app.models.llm_client import gemini_generate_json


# --------------------------------------------------
# RESOURCE URL VALIDATION
# --------------------------------------------------

def _is_direct_resource_url(url: str) -> bool:
    """Check whether a URL is suitable as a learning resource."""

    if not isinstance(url, str) or not url.strip():
        return False

    try:
        parsed = urlparse(url.strip())
    except (TypeError, ValueError):
        return False

    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return False

    host = parsed.netloc.lower().split(":")[0]
    path = parsed.path.lower()
    query = (parsed.query or "").lower()

    # Reject generic search-result pages.
    if host in {"youtube.com", "www.youtube.com"} and path == "/results":
        return False

    if host.startswith("google.") and path.startswith("/search"):
        return False

    if host.endswith("geeksforgeeks.org"):
        if path.rstrip("/") == "" or query.startswith("s="):
            return False

    return True


def _normalize_resources(resources) -> list[dict]:
    """Return valid learning resources in a consistent format."""

    normalized = []

    if not isinstance(resources, list):
        return normalized

    for resource in resources:
        if not isinstance(resource, dict):
            continue

        title = str(
            resource.get("title")
            or resource.get("name")
            or "Learning resource"
        ).strip()

        platform = str(resource.get("platform") or "Web").strip()
        url = str(resource.get("url") or "").strip()

        if not _is_direct_resource_url(url):
            continue

        normalized.append({
            "title": title,
            "platform": platform,
            "url": url,
        })

    return normalized


def _ensure_resource_links(learning_path: dict) -> dict:
    """Normalize resource links in all levels and skills."""

    levels = learning_path.get("levels")

    if not isinstance(levels, list):
        return learning_path

    for level in levels:
        if not isinstance(level, dict):
            continue

        skills = level.get("skills")

        if not isinstance(skills, list):
            continue

        for skill in skills:
            if not isinstance(skill, dict):
                continue

            resources = skill.get("resources") or skill.get("courses")
            skill["resources"] = _normalize_resources(resources)

    return learning_path


# --------------------------------------------------
# FALLBACK LEARNING PATH
# --------------------------------------------------

def _build_fallback_learning_path(
    occupation: str,
    missing_skills: list[str],
) -> dict:
    """
    Build a basic learning path without relying on Gemini.

    Used when the AI service fails, the quota is exhausted,
    or the AI response is invalid.
    """

    occupation = (
        occupation.strip()
        if isinstance(occupation, str) and occupation.strip()
        else "your target role"
    )

    skills = []
    seen_skills = set()

    for skill in missing_skills or []:
        if not isinstance(skill, str):
            continue

        skill = skill.strip()

        if skill and skill.casefold() not in seen_skills:
            skills.append(skill)
            seen_skills.add(skill.casefold())

    if not skills:
        skills = [
            "Programming fundamentals",
            "Problem solving",
        ]

    level_names = ["Beginner", "Intermediate", "Advanced"]
    week_allocations = [3, 4, 5]

    # Divide skills across up to three levels.
    number_of_levels = min(len(skills), len(level_names))
    skills_per_level = (
        len(skills) + number_of_levels - 1
    ) // number_of_levels

    levels = []

    for index in range(number_of_levels):
        start = index * skills_per_level
        level_skills = skills[start:start + skills_per_level]

        if not level_skills:
            continue

        skill_items = []

        for skill in level_skills:
            skill_items.append({
                "name": skill,
                "why": (
                    f"{skill} can help you progress toward a role as "
                    f"{occupation}. Learn the fundamentals, practise "
                    "with examples, and complete a small practical project."
                ),
                "resources": [
                    {
                        "title": f"GeeksforGeeks: {skill}",
                        "platform": "GeeksforGeeks",
                        "url": "https://www.geeksforgeeks.org/",
                    }
                ],
            })

        levels.append({
            "level": level_names[index],
            "weeks": week_allocations[index],
            "skills": skill_items,
        })

    return {
        "total_weeks": sum(level["weeks"] for level in levels),
        "levels": levels,
        "fallback": True,
        "message": (
            "The AI service is temporarily unavailable, so a basic "
            "fallback learning path is being displayed. Open the "
            "resource platform to find materials for each skill."
        ),
    }


# --------------------------------------------------
# MAIN LEARNING PATH GENERATOR
# --------------------------------------------------

def generate_learning_path(
    occupation: str,
    missing_skills: list[str],
) -> dict:
    """
    Generate a personalized learning path using RAG + Gemini.

    If retrieval or AI generation fails, return a fallback path
    so an external service failure does not crash this function.
    """

    occupation = (
        occupation.strip()
        if isinstance(occupation, str) and occupation.strip()
        else "your target role"
    )

    if not isinstance(missing_skills, list):
        missing_skills = []

    missing_skills = [
        skill.strip()
        for skill in missing_skills
        if isinstance(skill, str) and skill.strip()
    ]

    try:
        # 1. Retrieve relevant reference material.
        docs = []

        for skill in missing_skills:
            try:
                retrieved_docs = retrieve_docs(
                    f"{occupation} {skill}",
                    k=3,
                )

                if retrieved_docs:
                    docs.extend(retrieved_docs)

            except Exception as exc:
                # Retrieval failure should not prevent fallback generation.
                print(f"Document retrieval failed for '{skill}': {exc}")

        context_text = (
            "\n".join(str(doc) for doc in docs)
            if docs
            else "(No reference material found)"
        )

        # 2. Prepare the Gemini prompt.
        prompt = f"""
You are a career learning path expert.

OCCUPATION: {occupation}

MISSING SKILLS TO LEARN:
{', '.join(missing_skills) if missing_skills else 'Programming fundamentals and problem solving'}

REFERENCE MATERIAL:
{context_text}

Create a JSON learning path with this structure:
{{
  "total_weeks": 12,
  "levels": [
    {{
      "level": "Beginner",
      "weeks": 3,
      "skills": [
        {{
          "name": "skill name",
          "why": "why this skill matters",
          "resources": [
            {{
              "title": "resource title",
              "platform": "platform name",
              "url": "https://direct-resource-link"
            }}
          ]
        }}
      ]
    }}
  ]
}}

REQUIREMENTS:
- Create 2-3 levels: Beginner, Intermediate, and Advanced where appropriate.
- Prioritize the user's missing skills.
- Include 2-3 relevant skills per level where possible.
- Suggest 1-2 useful resources per skill.
- Resource URLs must be real, relevant, direct resource pages.
- Do not invent specific URLs.
- Avoid generic search-result URLs.
- Total duration should be between 8 and 16 weeks.
- Return ONLY valid JSON.
"""

        # 3. Generate the AI learning path.
        result = gemini_generate_json(prompt)

        # 4. Validate the basic response structure.
        if (
            isinstance(result, dict)
            and isinstance(result.get("levels"), list)
            and result["levels"]
        ):
            result = _ensure_resource_links(result)

            # Keep the response consistent for the frontend.
            result.setdefault("fallback", False)

            return result

        print(
            "Gemini returned an invalid or empty learning path. "
            "Using fallback."
        )

    except Exception as exc:
        print(f"Learning path generation failed: {exc}")

    # 5. Always try to return a basic path if AI generation fails.
    return _build_fallback_learning_path(
        occupation,
        missing_skills,
    )
