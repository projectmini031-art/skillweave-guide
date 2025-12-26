from fastapi import APIRouter
from app.models.job_recommender import recommend_jobs
from app.utils.data_loader import load_job_skill_map

router = APIRouter(prefix="/jobs", tags=["Jobs"])

JOB_SKILL_MAP = load_job_skill_map()

@router.post("/recommend")
def recommend(user_skills: list):
    return recommend_jobs(user_skills, JOB_SKILL_MAP)
