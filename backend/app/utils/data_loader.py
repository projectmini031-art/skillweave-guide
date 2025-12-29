import pandas as pd
from app.config import DATASET_DIR


def load_skills():
    df = pd.read_csv(DATASET_DIR / "skills_en.csv")
    return df["preferredLabel"].str.lower().tolist()


def load_job_skill_map():
    occ = pd.read_csv(DATASET_DIR / "occupations_en.csv")
    rel = pd.read_csv(DATASET_DIR / "occupationSkillRelations_en.csv")
    skills = pd.read_csv(DATASET_DIR / "skills_en.csv")

    # Map skill URI → skill name
    skill_map = dict(zip(skills["conceptUri"], skills["preferredLabel"]))

    job_skills = {}
    for _, row in rel.iterrows():
        job_uri = row["occupationUri"]
        skill_name = skill_map.get(row["skillUri"])
        if skill_name:
            job_skills.setdefault(job_uri, []).append(skill_name)

    # Map occupation URI → job name
    job_names = dict(zip(occ["conceptUri"], occ["preferredLabel"]))

    # Final: Job Name → Skill List
    return {
        job_names[job]: skills
        for job, skills in job_skills.items()
        if job in job_names
    }
