from pathlib import Path
import requests

from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates

from src.services.storage import local_storage


router = APIRouter(prefix="/contacts", tags=["contacts"])

app_dir = Path(__file__).parent
templates = Jinja2Templates(directory=app_dir / "templates")


@router.get("/")
def get_contacts(request: Request):
    access_token = local_storage.getItem("access_token")    
    refresh_token = local_storage.getItem("refresh_token")
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    
    # print(response.json())
    return templates.TemplateResponse("contacts.html", {"request": request, "contacts": response.json()})