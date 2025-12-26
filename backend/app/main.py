from fastapi import FastAPI
from app.api import resume, analysis, jobs, learning, rag, users

app = FastAPI()

app.include_router(users.router)
app.include_router(resume.router)
app.include_router(analysis.router)
app.include_router(jobs.router)
app.include_router(learning.router)
app.include_router(rag.router)
