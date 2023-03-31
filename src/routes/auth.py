from pathlib import Path
import requests
import json

from fastapi import APIRouter, Request, Form, Response
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
# from starlette.responses import RedirectResponse
from starlette import status

# from src.services.storage import local_storage, Storage


router = APIRouter(prefix="/auth", tags=["auth"])

app_dir = Path(__file__).parent
templates = Jinja2Templates(directory=app_dir / "templates")


@router.get("/login")
def form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "placeholder": "example@example.com"})


@router.post("/login")
def postdata(request: Request, username = Form(), password = Form()):
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        "username": username,
        "password": password
        }
    
    response = requests.post("https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/login", headers=headers, data=data)
    
    # local_storage.setItem("access_token", response.json().get("access_token"))
    # local_storage.setItem("refresh_token", response.json().get("refresh_token"))
    access_token = response.json().get("access_token")
    refresh_token = response.json().get("refresh_token")
    options = json.dumps({
        "access_token": access_token,
        "refresh_token": refresh_token
        })
    
    # headers = {"Authorization": f"Bearer {access_token}"}
    # response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    
    # print(options)
    # print("====================")
    # payload = {
    #     "request": request,
    #     # "access_token": access_token,
    #     # "refresh_token": refresh_token,
    #     "contacts": response.json()
        # }
    
    # return requests.get("http://localhost:8000/contacts")
    # return Response(content=response.content)
    return RedirectResponse(url=f"/contacts?options={options}", status_code=status.HTTP_303_SEE_OTHER)