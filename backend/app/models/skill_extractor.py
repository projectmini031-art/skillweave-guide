import spacy

nlp = spacy.load("en_core_web_sm")

def extract_skills(text):
    doc = nlp(text)
    skills = set()
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "SKILL"]:
            skills.add(ent.text)
    return list(skills)
