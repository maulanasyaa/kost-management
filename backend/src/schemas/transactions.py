from datetime import date
from typing import Optional

from models.transactions import PaymentMethod
from pydantic import BaseModel, ConfigDict


class TransactionBase(BaseModel):
    contract_id: int
    method: PaymentMethod


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    amount: int
    is_paid: bool
    created_at: date

    model_config = ConfigDict(from_attributes=True)


class TransactionUpdate(BaseModel):
    contract_id: Optional[int] = None
    amount: Optional[int] = None
    method: Optional[PaymentMethod] = None
