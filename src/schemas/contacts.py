from typing import Optional, Union, List, Annotated
from datetime import date, datetime

from pydantic import BaseModel, Field, EmailStr, constr, NoneStr
from fastapi import File, UploadFile, Form, Body
from pydantic.fields import Undefined


class Token(BaseModel):
    access_token: Union[str, int, None]
    # refresh_token: Optional[str]
    
    
class Group(BaseModel):
    id: int
    name: str
    
    class Config:
        orm_mode = True
    

class Contact(BaseModel):
    first_name: str = Field(min_length=3, max_length=50)
    last_name: str = Field(min_length=3, max_length=50)
    username: str
    birthday: Optional[date]
    job: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    #     constr(
    #         strip_whitespace=True,
    #         regex=r"^(\+)[1-9][0-9\-\(\)]{9,16}$",
    #     )
    # ]
    # groups: List[Group]
    avatar: UploadFile = File()
    password: str
    
    class Config:
        orm_mode = True

# @as_form
class Avatar(BaseModel):
    avatar: UploadFile
    
class ContactAll(BaseModel):
    username: Annotated[str, Form()]
    job: Optional[str]
    avatar: Annotated[UploadFile, File()]
    
    # def handler(self):
        