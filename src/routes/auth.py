from pathlib import Path
import requests
import json
from typing import Annotated

from fastapi import APIRouter, Request, Form, Response, Depends, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

from src.schemas.contacts import ContactAll, Avatar


# from src.services.storage import local_storage, Storage


router = APIRouter(prefix="/auth", tags=["auth"])

app_dir = Path(__file__).parent
templates = Jinja2Templates(directory=app_dir / "templates")


@router.get("/singin")
def form(request: Request):
    return templates.TemplateResponse("singin.html", {"request": request})


@router.get("/singup")
def form(request: Request):
    return templates.TemplateResponse("singup.html", {"request": request})


# @router.post("/singup")
# async def create_user(request: Request, body: ContactAll = Depends(ContactAll), avatar: Avatar = Depends(Avatar)):
    # multipart_data = decoder.MultipartDecoder.from_response(response)
    # forms = await request.form()
    # async with request.form():
    # async with request.form() as form:
        # filename = form["upload_file"].filename
        # contents = await form["upload_file"].read()
        # file = form["avatar"].file
    # class Form:
    #     pass
    
    # for key, value in forms.items():
    #     Form.key = value
        
    # print(forms._dict.pop())
    # print(avatar)
    # file = File(a)
    # print(file)
    
        # cloudinary.uploader.upload(file, public_id=f"ContactsApp/456", overwrite=True,
        #                             eager = [{"width": 250, "height": 250, "crop": "fill"}])
        # image_info = cloudinary.api.resource(f"ContactsApp/456")
        # src_url = image_info["derived"][0]["secure_url"]
        # print(src_url)
    
    
    
    # body = b""
    # async for chunk in request.stream():
    #     body += chunk
    # print(body)


# @router.post("/login")
# def postdata(request: Request, username = Form(), password = Form()):
#     headers = {'Content-Type': 'application/x-www-form-urlencoded'}
#     data = {
#         "username": username,
#         "password": password
#         }
    
#     response = requests.post("https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/login", headers=headers, data=data)
    
#     # local_storage.setItem("access_token", response.json().get("access_token"))
#     # local_storage.setItem("refresh_token", response.json().get("refresh_token"))
#     access_token = response.json().get("access_token")
#     refresh_token = response.json().get("refresh_token")
#     options = json.dumps({
#         "access_token": access_token,
#         "refresh_token": refresh_token
#         })
    
#     # headers = {"Authorization": f"Bearer {access_token}"}
#     # response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    
#     # print(options)
#     # print("====================")
#     # payload = {
#     #     "request": request,
#     #     # "access_token": access_token,
#     #     # "refresh_token": refresh_token,
#     #     "contacts": response.json()
#         # }
    
#     # return requests.get("http://localhost:8000/contacts")
#     # return Response(content=response.content)
#     return RedirectResponse(url=f"/contacts?options={options}", status_code=status.HTTP_303_SEE_OTHER)