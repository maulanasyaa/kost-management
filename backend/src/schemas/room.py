from datetime import date
from typing import Optional

from models.room import RoomType
from pydantic import BaseModel, ConfigDict


class RoomBase(BaseModel):
    room_number: str
    room_type: RoomType
    price: int


class RoomCreate(RoomBase):
    pass


class RoomResponse(RoomBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class RoomUpdate(BaseModel):
    room_number: Optional[str] = None
    room_type: Optional[RoomType] = None
    price: Optional[int] = None


# --- tambahan untuk kebutuhan RoomCard ---


class RenterOut(BaseModel):
    id: int
    name: str
    phone_number: str

    model_config = ConfigDict(from_attributes=True)


class ContractOut(BaseModel):
    id: int
    start_date: date
    end_date: date
    price: int
    term: int

    model_config = ConfigDict(from_attributes=True)


class RoomCardOut(RoomBase):
    id: int
    status: str  # "occupied" | "vacant"
    renter: Optional[RenterOut] = None
    contract: Optional[ContractOut] = None

    model_config = ConfigDict(from_attributes=True)
