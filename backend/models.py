# use pydantic for data validation
from pydantic import BaseModel

# defining item modal
# this model is for pydantic but inorder to communicate with data base and write the query using 
# sqlAlchemy we need another models (in databaseModels.py)
class Item(BaseModel):
    id: int
    title: str
     
    
        

        
