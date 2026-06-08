from enum import Enum

from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class RoomType(Enum):
    STANDARD = "standard"
    DELUXE = "deluxe"
    VIP = "vip"


class Room(Base):
    __tablename__ = "rooms"
    id: Mapped[int] = mapped_column(primary_key=True)
    room_number: Mapped[str] = mapped_column(String(50), unique=True)
    room_type: Mapped[RoomType] = mapped_column(SAEnum(RoomType))
    price: Mapped[int] = mapped_column()
