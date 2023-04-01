from typing import Optional, Union

from pydantic import BaseModel


class Token(BaseModel):
    access_token: Union[str, int, None]
    # refresh_token: Optional[str]
    