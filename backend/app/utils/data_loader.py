import pandas as pd
from app.config import DATASET_DIR

def load_esco_skills():
    df = pd.read_csv(DATASET_DIR / "esco_skills.csv")
    return df["preferredLabel"].str.lower().tolist()

def load_job_skill_map():
    occ = pd.read_csv(DATASET_DIR / "esco_occupations.csv")
    rel = pd.read_csv(DATASET_DIR / "esco_occupation_skill.csv")
    skills = pd.read_csv(DATASET_DIR / "esco_skills.csv")

    skill_map = dict(zip(skills["conceptUri"], skills["preferredLabel"]))

    job_skills = {}
    for _, row in rel.iterrows():
        job = row["occupationUri"]
        skill = skill_map.get(row["skillUri"])
        if skill:
            job_skills.setdefault(job, []).append(skill)

    job_names = dict(zip(occ["conceptUri"], occ["preferredLabel"]))
    return {job_names[k]: v for k, v in job_skills.items() if k in job_names}
