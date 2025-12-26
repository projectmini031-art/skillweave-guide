from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(150))

class UserSkill(Base):
    __tablename__ = "user_skills"
    skill_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    raw_skill = Column(String(150))
    standard_skill_code = Column(String(50))
    confidence_score = Column(Float)
