from datetime import date
from typing import Sequence

from database import get_db
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, HTTPException, status
from models import contract as models
from models import renter as renter_models
from models import room as room_models
from schemas import contract as schemas
from sqlalchemy.orm import Session, joinedload

router = APIRouter(prefix="/contracts", tags=["Contracts"])


# utils
def get_contract_or_404(contract_id: int, db: Session) -> models.Contract:
    contract = (
        db.query(models.Contract).filter(models.Contract.id == contract_id).first()
    )

    if contract is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kontrak tidak ada."
        )

    return contract


# create
@router.post(
    "/", response_model=schemas.ContractResponse, status_code=status.HTTP_201_CREATED
)
def create_contract(
    contract: schemas.ContractCreate, db: Session = Depends(get_db)
) -> models.Contract:
    data = contract.model_dump()
    data["end_date"] = data["start_date"] + relativedelta(months=data["term"])

    room_id = contract.room_id
    renter_id = contract.renter_id

    # check room id availability on room table
    room_avail_check = (
        db.query(room_models.Room).filter(room_models.Room.id == room_id).first()
    )

    if room_avail_check is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kamar tidak ada"
        )

    # check renter id availability on renter table
    renter_avail_check = (
        db.query(renter_models.Renter)
        .filter(renter_models.Renter.id == renter_id)
        .first()
    )

    if renter_avail_check is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Penyewa tidak ada"
        )

    # check room active
    today = date.today()
    room_active_check = (
        db.query(models.Contract)
        .filter(models.Contract.room_id == room_id)
        .filter(models.Contract.end_date >= today)
        .first()
    )

    if room_active_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Kamar sudah terisi."
        )

    db_contract = models.Contract(**data)
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)

    return db_contract


# read
@router.get("/", response_model=list[schemas.ContractCardOut])
def get_contracts(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
) -> Sequence[models.Contract]:
    contract = (
        db.query(models.Contract)
        .options(joinedload(models.Contract.room), joinedload(models.Contract.renter))
        .offset(skip)
        .limit(limit)
        .all()
    )
    # joinedload digunakan untuk menghindari N+1 query problem, sehingga data room dan renter dapat diambil dalam satu query.
    # joinedload ambil relationship di models

    return contract


@router.get("/{contract_id}", response_model=schemas.ContractResponse)
def get_contract(contract_id: int, db: Session = Depends(get_db)) -> models.Contract:
    contract = get_contract_or_404(contract_id, db)

    return contract


# update
@router.patch("/{contract_id}", response_model=schemas.ContractResponse)
def update_contract(
    contract_id: int, contract: schemas.ContractUpdate, db: Session = Depends(get_db)
) -> models.Contract:
    db_contract = get_contract_or_404(contract_id, db)

    update_data = contract.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_contract, key, value)

    db.commit()
    db.refresh(db_contract)

    return db_contract


# delete
@router.delete("/{contract_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contract(contract_id: int, db: Session = Depends(get_db)) -> None:
    contract = get_contract_or_404(contract_id, db)

    db.delete(contract)
    db.commit()
