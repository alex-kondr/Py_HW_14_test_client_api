import json

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


def get_contacts_by_access_token(request, access_token):
    # access_token = body.access_token
    
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
   
    payload = {
        "request": request,
        "access_token": access_token,
        # "refresh_token": refresh_token,
        "contacts": response.json()
    }

    return templates.TemplateResponse("contacts.html", payload)


def get_refresh_token():
    pass

# router.mount("/static", StaticFiles(directory="static"), name="static")
@router.post("/redirect")
def get_access(request: Request):
    print(request.__dict__)
    # print(data)
    # return get_contacts_by_access_token(request, data.access_token)


@router.options("/test")
def test(body: Token):
    print(body)
    

@router.get("/")
def get_contacts(request: Request, options: str = None):
    # print("contacts")
    access_token = None
    refresh_token = None
    
    if options:
        access_token = json.loads(options).get("access_token")
        refresh_token = json.loads(options).get("refresh_token")
    
    
    # print(access_token)
    
    # if 
    # access_token = local_storage.getItem("access_token")
    # refresh_token = local_storage.getItem("refresh_token")
    # local_storage.clear()
    # print(local_storage.getItem("access_token"))
    
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    # print(response.text)
    
    # print(request.__dict__)
    if response.status_code == 200:
        payload = {
            "request": request,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "contacts": response.json()
        }
    else:
        payload = {
            "request": request
            }
    # print(response.json())
    return templates.TemplateResponse("contacts.html", payload)