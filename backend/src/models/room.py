from enum import Enum
from typing import TYPE_CHECKING

from database import Base
from sqlalchemy import Enum as SAEnum
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models.contract import Contract


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

    contracts: Mapped[list["Contract"]] = relationship(back_populates="room")
