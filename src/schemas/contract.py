from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ContractBase(BaseModel):
    room_id: int
    renter_id: int
    term: int
    price: int
    start_date: date


class ContractCreate(ContractBase):
    pass


class ContractResponse(ContractBase):
    id: int
    end_date: date

    model_config = ConfigDict(from_attributes=True)


class ContractUpdate(BaseModel):
    room_id: Optional[int] = None
    renter_id: Optional[int] = None
    term: Optional[int] = None
    price: Optional[int] = None
    start_date: Optional[date] = None
