from typing import Optional

from pydantic import BaseModel, ConfigDict


class RenterBase(BaseModel):
    name: str
    phone_number: str
    ktp_number: str


class RenterCreate(RenterBase):
    pass


class RenterResponse(RenterBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class RenterUpdate(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None
    ktp_number: Optional[str] = None
