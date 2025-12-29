import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / "datasets"

DATABASE_URL = "postgresql://postgres:password@localhost:5432/skillsync_db"
