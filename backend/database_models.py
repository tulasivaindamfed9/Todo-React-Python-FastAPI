from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

Base=declarative_base()

# this model is to communicate with sqlAlchemy(it is used to write sql query in python)
class Item(Base):
    __tablename__ ="items"
    id = Column(Integer, primary_key = True , index=True)
    title = Column(String)