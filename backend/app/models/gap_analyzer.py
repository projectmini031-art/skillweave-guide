def analyze_skill_gap(user_skills, job_skills):
    user_set = set(user_skills)
    job_set = set(job_skills)

    return {
        "matched_skills": list(user_set & job_set),
        "missing_skills": list(job_set - user_set),
        "match_percentage": round((len(user_set & job_set) / len(job_set)) * 100, 2)
        if job_set else 0
    }
