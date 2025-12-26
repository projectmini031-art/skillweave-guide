from rapidfuzz import process

def normalize_skills(skills, standard_skills):
    normalized = []
    for skill in skills:
        match, score, _ = process.extractOne(skill, standard_skills)
        if score > 80:
            normalized.append(match)
    return list(set(normalized))
