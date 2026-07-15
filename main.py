from fastapi import FastAPI
from models import Item

app = FastAPI()
@app.get("/")
def sayHi():
    return "hi tulsi, welcome to backend development with fastapi. i'm doing "


Item_list=[
    Item(id=1,title='title1'),
    Item(id=2,title='title2')

]
@app.get('/items')
def get_items():
    return Item_list

    