from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from models import ItemCreate,ItemResponse, ItemUpdate
from database import SessionLocal, engine
from sqlalchemy.orm import Session
import database_models

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://todo-react-python-fastapi.onrender.com/","https://todofastapi.vercel.app/"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"]
)

database_models.Base.metadata.create_all(bind=engine)

@app.get("/")   
def sayHi():
    return "hi tulsi, welcome to backend development with fastapi. i'm doing "


Item_list=[
    ItemCreate(title='title1'),
    ItemCreate(title='title2')

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
    try:
        count=db.query(database_models.Item).count()

        if count == 0:
           for each in Item_list:
              db.add(database_models.Item(title=each.title))
        
        db.commit()
    finally:    
        db.close()

    
init_db()

@app.get("/items")
def get_items(db: Session = Depends(get_db)):
    return db.query(database_models.Item).filter(
        database_models.Item.is_completed == False
    ).all()

@app.get("/completed-items")
def get_completed_items(db: Session = Depends(get_db)):
    return db.query(database_models.Item).filter(
        database_models.Item.is_completed == True
    ).all()

# to get one particular product based on id
@app.get('/item/{id}')
def get_item_by_id(id: int, db:Session = Depends(get_db)):  
    db_item=db.query(database_models.Item).filter(database_models.Item.id==id).first()
    if db_item:
        return db_item
        
    return "no matching id"    

# post an item
# @app.post('/item')
# def post_item(item:Item, db:Session = Depends(get_db)):   # type hinting to accept the payload
#     db.add(database_models.Item(**item.model_dump()))
#     db.commit()
#     return item
@app.post("/item", response_model=ItemResponse)
def post_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = database_models.Item(title=item.title)

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item


# update an item
@app.put("/item/{id}")
def update_item(id: int, itemToUpdate: ItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(database_models.Item).filter(
        database_models.Item.id == id
    ).first()

    if not db_item:
        return {"message": "Item not found"}

    db_item.title = itemToUpdate.title
    db.commit()
    db.refresh(db_item)

    return db_item  

    
#  delete an item based on id
@app.delete("/item/{id}")
def del_item(id: int, db: Session = Depends(get_db)):
    db_item = db.query(database_models.Item).filter(
        database_models.Item.id == id
    ).first()

    if not db_item:
        return {"message": "Item not found"}

    db.delete(db_item)
    db.commit()

    return {"message": "Deleted successfully"} 

@app.put("/item/{id}/complete")
def complete_task(id: int, db: Session = Depends(get_db)):
    task = db.query(database_models.Item).filter(
        database_models.Item.id == id
    ).first()

    if not task:
        return {"message": "Task not found"}

    task.is_completed = True

    db.commit()
    db.refresh(task)

    return task
