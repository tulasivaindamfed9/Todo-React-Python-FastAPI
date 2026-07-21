from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

# postgre db coonection
db_url= os.getenv("DATABASE_URL")
# creating an engine to build connection between postgre and our localsession
engine=create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine) 