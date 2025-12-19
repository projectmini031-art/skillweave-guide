from fastapi import APIRouter
from app.models.learning_path import generate_learning_path

router = APIRouter(prefix="/learning", tags=["Learning"])

@router.post("/path")
def learning_path(missing_skills: list):
    return generate_learning_path(missing_skills)
