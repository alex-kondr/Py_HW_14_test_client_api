from pathlib import Path
import requests

from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import uvicorn

from src.routes import auth, contacts


app_dir = Path(__file__).parent

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory=app_dir / "templates")

app.include_router(auth.router)
app.include_router(contacts.router)

@app.get('/')
def hello(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})



    


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    # print(response.json())
    # print(get_contacts())