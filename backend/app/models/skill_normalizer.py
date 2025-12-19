from rapidfuzz import process

def normalize_skills(user_skills: list, standard_skills: list) -> list:
    normalized = set()
    for skill in user_skills:
        match, score, _ = process.extractOne(skill, standard_skills)
        if score >= 80:
            normalized.add(match)
    return list(normalized)
