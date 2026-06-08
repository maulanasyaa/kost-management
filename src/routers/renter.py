from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import renter as models
from schemas import renter as schemas

router = APIRouter(prefix="/renters", tags=["Renters"])


# utils
def get_renter_or_404(renter_id: int, db: Session) -> models.Renter:
    db_renter = db.query(models.Renter).filter(models.Renter.id == renter_id).first()

    if db_renter is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Renter tidak ada"
        )

    return db_renter


# create
@router.post(
    "/", response_model=schemas.RenterResponse, status_code=status.HTTP_201_CREATED
)
def create_renter(
    renter: schemas.RenterCreate, db: Session = Depends(get_db)
) -> models.Renter:
    data = renter.model_dump()
    ktp_num_check = (
        db.query(models.Renter)
        .filter(models.Renter.ktp_number == renter.ktp_number)
        .first()
    )

    if ktp_num_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Data sudah ada"
        )

    db_renter = models.Renter(**data)
    db.add(db_renter)
    db.commit()
    db.refresh(db_renter)

    return db_renter


# read
@router.get("/", response_model=list[schemas.RenterResponse])
def get_renters(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
) -> Sequence[models.Renter]:
    renters = db.query(models.Renter).offset(skip).limit(limit).all()

    return renters


@router.get("/{renter_id}", response_model=schemas.RenterResponse)
def get_renter(renter_id: int, db: Session = Depends(get_db)) -> models.Renter:
    db_renter = get_renter_or_404(renter_id, db)

    return db_renter


# update
@router.patch("/{renter_id}", response_model=schemas.RenterResponse)
def update_renter(
    renter_id: int, renter: schemas.RenterUpdate, db: Session = Depends(get_db)
) -> models.Renter:
    db_renter = get_renter_or_404(renter_id, db)

    update_data = renter.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_renter, key, value)

    db.commit()
    db.refresh(db_renter)

    return db_renter


# delete
@router.delete("/{renter_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_renter(renter_id: int, db: Session = Depends(get_db)) -> None:
    db_renter = get_renter_or_404(renter_id, db)

    db.delete(db_renter)
    db.commit()
