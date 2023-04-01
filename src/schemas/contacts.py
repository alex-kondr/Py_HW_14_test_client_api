from typing import Optional, Union, List
from datetime import date, datetime

from pydantic import BaseModel, Field, EmailStr, constr


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
    phone: Optional[
        constr(
            strip_whitespace=True,
            regex=r"^(\+)[1-9][0-9\-\(\)]{9,16}$",
        )
    ]
    email: Optional[EmailStr]
    birthday: Optional[date]
    job: Optional[str]
    groups: List[int]
    id: int
    groups: List[Group]
    avatar: Optional[str]
    created_at: datetime
    
    class Config:
        orm_mode = True


# class ContactAll(BaseModel):
#     contacts