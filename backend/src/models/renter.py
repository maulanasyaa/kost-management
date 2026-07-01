from typing import TYPE_CHECKING

from database import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models.contract import Contract


class Renter(Base):
    __tablename__ = "renters"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    phone_number: Mapped[str] = mapped_column(String)
    ktp_number: Mapped[str] = mapped_column(String, unique=True)

    contracts: Mapped[list["Contract"]] = relationship(back_populates="renter")
