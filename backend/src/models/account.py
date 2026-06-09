from datetime import date
from enum import Enum

from sqlalchemy import Date, ForeignKey, String
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class AccountRole(Enum):
    ADMIN = "admin"
    EMPLOYEE = "employee"
    RENTER = "renter"


class Account(Base):
    __tablename__ = "accounts"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)
    role: Mapped[AccountRole] = mapped_column(SAEnum(AccountRole))
    renter_id: Mapped[int] = mapped_column(ForeignKey("renters.id"), nullable=True)
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
