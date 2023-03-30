from pathlib import Path
import requests

from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
import uvicorn


app_dir = Path(__file__).parent

app = FastAPI()

templates = Jinja2Templates(directory=app_dir / "templates")

@app.get('/')
def hello(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "name": "abagalamaga"})

# @app.get("/")
# def kuku():
#     return {"kuku": "hello"}

def login():
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {
        "username": "alex_kondr@outlook.com",
        "password": "123456"        
        }
    response = requests.post("https://SilentDismalSweepsoftware.olieksandrkond3.repl.co/api/auth/login", headers=headers, data=data)
    return response.json()
    
def get_contacts():
    access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGV4X2tvbmRyQG91dGxvb2suY29tIiwiaWF0IjoxNjgwMTgzNTUxLCJleHAiOjE2ODAxOTA3NTEsInNjb3BlIjoiYWNjZXNzX3Rva2VuIn0.ZlyMcmigjgXn2Yaz5EzZUYWdTUwbhWuxlIcVlKNXnJY'
    refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGV4X2tvbmRyQG91dGxvb2suY29tIiwiaWF0IjoxNjgwMTgzNTUxLCJleHAiOjE2ODA3ODgzNTEsInNjb3BlIjoicmVmcmVzaF90b2tlbiJ9.SjtkbKrz_t5CoWUbli76ytRzS95WZnIBEpLZlSEkDrs'
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get("https://silentdismalsweepsoftware.olieksandrkond3.repl.co/api/contacts/", headers=headers)
    return response.json()

if __name__ == "__main__":
    # uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    # print(response.json())
    print(get_contacts())