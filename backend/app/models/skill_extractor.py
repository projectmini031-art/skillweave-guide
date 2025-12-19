import spacy

nlp = spacy.load("en_core_web_sm")

def extract_skills(text: str, skill_list: list) -> list:
    text = text.lower()
    extracted = set()

    for skill in skill_list:
        if skill in text:
            extracted.add(skill)

    return list(extracted)
