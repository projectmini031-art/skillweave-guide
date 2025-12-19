def analyze_skill_gap(user_skills: list, job_skills: list) -> dict:
    user_set = set(user_skills)
    job_set = set(job_skills)

    missing = list(job_set - user_set)
    matched = list(user_set & job_set)

    score = (len(matched) / len(job_set)) * 100 if job_set else 0

    return {
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": round(score, 2)
    }
