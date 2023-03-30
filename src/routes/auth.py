from pathlib import Path
import requests

from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates

from src.services.storage import local_storage
from src.routes.contacts import get_contacts


router = APIRouter(prefix="/auth", tags=["auth"])

app_dir = Path(__file__).parent
templates = Jinja2Templates(directory=app_dir / "templates")

@router.get("/login")
def form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "placeholder": "example@example.com"})

@router.post("/login")
def postdata(username = Form(), password = Form()):
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        "username": username,
        "password": password        
        }
    
    response = requests.post("https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/login", headers=headers, data=data)
    
    local_storage.setItem("access_token", response.json().get("access_token"))
    local_storage.setItem("refresh_token", response.json().get("refresh_token"))
    
    return response.json()