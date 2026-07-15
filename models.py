# use pydantic for data validation
from pydantic import BaseModel

# defining item modal
class Item(BaseModel):
    id: int
    title: str
     
    
        

        
