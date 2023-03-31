from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: Optional[str]
    refresh_token: Optional[str]
    