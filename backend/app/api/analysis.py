from fastapi import APIRouter
from app.models.gap_analyzer import analyze_skill_gap

router = APIRouter(prefix="/analysis", tags=["Analysis"])

@router.post("/gap")
def skill_gap(user_skills: list, job_skills: list):
    return analyze_skill_gap(user_skills, job_skills)
