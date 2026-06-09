from typing import Optional

from pydantic import BaseModel, ConfigDict


class AccountRegister(BaseModel):
    email: str
    password: str
    renter_id: Optional[int] = None


class AccountRegisterResponse(BaseModel):
    email: str

    model_config = ConfigDict(from_attributes=True)


class AccountLogin(BaseModel):
    email: str
    password: str


class AccountResponse(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: int
