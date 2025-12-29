from fastapi import APIRouter, UploadFile
from app.models.skill_extractor import extract_skills
from app.utils.data_loader import load_skills

router = APIRouter(prefix="/resume", tags=["Resume"])

SKILLS = load_skills()

@router.post("/upload")
async def upload_resume(file: UploadFile):
    text = (await file.read()).decode("utf-8", errors="ignore")
    skills = extract_skills(text, SKILLS)
    return {"extracted_skills": skills}
