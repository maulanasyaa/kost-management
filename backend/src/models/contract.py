from datetime import date
from typing import TYPE_CHECKING

from database import Base
from sqlalchemy import Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models.renter import Renter
    from models.room import Room


class Contract(Base):
    __tablename__ = "contracts"
    id: Mapped[int] = mapped_column(primary_key=True)
    room_id: Mapped[int] = mapped_column(ForeignKey("rooms.id"))
    renter_id: Mapped[int] = mapped_column(ForeignKey("renters.id"))
    term: Mapped[int] = mapped_column()
    price: Mapped[int] = mapped_column()
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)

    room: Mapped["Room"] = relationship(back_populates="contracts")
    renter: Mapped["Renter"] = relationship(back_populates="contracts")
