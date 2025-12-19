from fastapi import FastAPI
from app.api import resume, analysis, jobs, learning, rag

app = FastAPI(title="Skill Gap Analysis Backend")

app.include_router(resume.router)
app.include_router(analysis.router)
app.include_router(jobs.router)
app.include_router(learning.router)
app.include_router(rag.router)

@app.get("/")
def root():
    return {"status": "Backend is running successfully"}
