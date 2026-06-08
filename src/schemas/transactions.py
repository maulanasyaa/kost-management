from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict

from models.transactions import PaymentMethod


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
