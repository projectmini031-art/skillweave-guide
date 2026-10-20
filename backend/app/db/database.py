
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=10000
)

db = client["skillsync"]

# Existing collections
user_skills_collection = db["user_skills"]
users_collection = db["users"]
user_context_collection = db["user_context"]
goals_collection = db["goals"]
tasks_collection = db["tasks"]
posts_collection = db["posts"]
comments_collection = db["comments"]
votes_collection = db["votes"]
private_messages_collection = db["private_messages"]
resources_collection = db["resources"]
feedback_collection = db["feedback"]
market_skill_trends_collection = db["market_skill_trends"]
collaboration_projects_collection = db["collaboration_projects"]
collaboration_requests_collection = db["collaboration_requests"]
opportunities_collection = db["opportunities"]


def get_db():
    return db
