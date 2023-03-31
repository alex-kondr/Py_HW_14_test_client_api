import pickle

from pathlib import Path
import requests

from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


# from src.services.storage import local_storage
from src.chemas.contacts import Token


router = APIRouter(prefix="/contacts", tags=["contacts"])

app_dir = Path(__file__).parent
templates = Jinja2Templates(directory=app_dir / "templates")

# router.mount("/static", StaticFiles(directory="static"), name="static")
@router.post("/test")
def get_access(body: str):
    print(body)


@router.get("/")
def get_contacts(request: Request, options):
    
    print(pickle.loads(options.encode()))
    
    # if 
    # access_token = local_storage.getItem("access_token")
    # refresh_token = local_storage.getItem("refresh_token")
    # local_storage.clear()
    # print(local_storage.getItem("access_token"))
    
    headers = {"Authorization": f"Bearer 123"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    # print(response.json())
    
    # print(request.__dict__)
    
    payload = {
        "request": request,
        # "access_token": access_token,
        # "refresh_token": refresh_token,
        "contacts": response.json()
    }
    # print(response.json())
    return templates.TemplateResponse("contacts.html", payload)