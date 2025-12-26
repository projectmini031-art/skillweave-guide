from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")

def recommend_jobs(user_skills, job_skill_map):
    user_vec = model.encode(" ".join(user_skills))
    results = []

    for job, skills in job_skill_map.items():
        job_vec = model.encode(" ".join(skills))
        score = cosine_similarity([user_vec], [job_vec])[0][0]
        results.append({"job": job, "score": round(score * 100, 2)})

    return sorted(results, key=lambda x: x["score"], reverse=True)
