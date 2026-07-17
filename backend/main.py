from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from models import Item
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import database_models

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"]
)

database_models.Base.metadata.create_all(bind=engine)

@app.get("/")   
def sayHi():
    return "hi tulsi, welcome to backend development with fastapi. i'm doing "


Item_list=[
    Item(id=1,title='title1'),
    Item(id=2,title='title2')

]

# we start connecting the db and after using it when close the session
def get_db():
      db=SessionLocal()
      try:
          yield db
      finally:
          db.close()    

# inorder to store the Item_list to databse we need to initilize ds
def init_db():
   
    db=SessionLocal()
    count=db.query(database_models.Item).count

    if count == 0:
        for each in Item_list:
          db.add(database_models.Item(**each.model_dump()))
         #    model_dump will give dicionary and ** will unpack the model "each item".
         # which means ** will give key value pairs(obj)

        db.commit()

    
init_db()

@app.get('/items')
def get_items(db:Session = Depends(get_db)):   
    db_items= db.query(database_models.Item).all()
    return db_items

# to get one particular product based on id
@app.get('/item/{id}')
def get_item_by_id(id: int, db:Session = Depends(get_db)):  
    db_item=db.query(database_models.Item).filter(database_models.Item.id==id).first()
    if db_item:
        return db_item
        
    return "no matching id"    

# post an item
@app.post('/item')
def post_item(item:Item, db:Session = Depends(get_db)):   # type hinting to accept the payload
    db.add(database_models.Item(**item.model_dump()))
    db.commit()
    return item


# update an item
@app.put('/item')
def update_item(id:int, itemToUpdate:Item, db:Session = Depends(get_db)):
    db_item_update= db.query(database_models.Item).filter(database_models.Item.id==id).first()

    if db_item_update:
       db_item_update.title= itemToUpdate.title
       db.commit()
       return "item updated successfuly"
    else:
        return "item not found"   

    
#  delete an item based on id
@app.delete('/item')
def del_item(id:int, db:Session = Depends(get_db)):
    db_item_to_delete=db.query(database_models.Item).filter(database_models.Item.id == id).first()
    if db_item_to_delete:   
      db.delete(db_item_to_delete)
      db.commit()
      return "item deleted successsfully"
    else:
        return "no item found to delete"  
