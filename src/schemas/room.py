from typing import Optional

from pydantic import BaseModel, ConfigDict

from models.room import RoomType


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
