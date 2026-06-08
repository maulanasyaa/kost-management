from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Renter(Base):
    __tablename__ = "renters"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    phone_number: Mapped[str] = mapped_column(String)
    ktp_number: Mapped[str] = mapped_column(String, unique=True)
