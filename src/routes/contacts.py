import json
from typing import List

from pathlib import Path
import requests

from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


# from src.services.storage import local_storage
from src.schemas.contacts import Token, Contact


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


@router.post("/")
def test(request: Request, body: List[Contact]):
    # print("request", request)
    # print("body", body)
    return(templates.TemplateResponse("test.html", {"request": request}))
    

@router.get("/")
def get_contacts(request: Request, options: str = None, reload: bool = False):
    # print("contacts")
    # print(f"{options=}")
    # print(f"{reload=}")
    access_token = None
    refresh_token = None
    
    if options:
        tokens = json.loads(options)
    
        if isinstance(tokens, dict):
            access_token = tokens.get("access_token")
            refresh_token = tokens.get("refresh_token")
    
    
    # print(access_token)
    
    # if 
    # access_token = local_storage.getItem("access_token")
    # refresh_token = local_storage.getItem("refresh_token")
    # local_storage.clear()
    # print(local_storage.getItem("access_token"))
    
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    # print(response.text)
    if reload:
        status_code = 403
    else:
        status_code = response.status_code
    
    # print(request.__dict__)
    if response.status_code == 200:
        payload = {
            "request": request,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "contacts": response.json(),
            "stat_code": response.status_code
        }
    elif response.status_code == 401:
        payload = {
            "request": request,
            "message": response.json().get("detail"),
            "stat_code": status_code
            }
    # print(response.json())
    return templates.TemplateResponse("contacts.html", payload)