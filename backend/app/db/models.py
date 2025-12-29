from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class SkillAnalysis(Base):
    __tablename__ = "skill_analysis"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    job_role = Column(String)
    match_percentage = Column(Float)
    created_at = Column(DateTime, server_default=func.now())
