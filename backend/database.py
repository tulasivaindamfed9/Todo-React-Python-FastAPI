from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# postgre db coonection
db_url="postgresql://postgres:Postgres12@localhost:5432/TO_DO_List_FAPI"
# creating an engine to build connection between postgre and our localsession
engine=create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine) 