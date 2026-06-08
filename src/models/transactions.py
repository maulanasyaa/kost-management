from datetime import date
from enum import Enum

from sqlalchemy import Boolean, Date, ForeignKey
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class PaymentMethod(Enum):
    TUNAI = "tunai"
    TRANSFER = "transfer"


class Transaction(Base):
    __tablename__ = "transactions"
    id: Mapped[int] = mapped_column(primary_key=True)
    contract_id: Mapped[int] = mapped_column(ForeignKey("contracts.id"))
    amount: Mapped[int] = mapped_column()
    method: Mapped[PaymentMethod] = mapped_column(SAEnum(PaymentMethod))
    is_paid: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
