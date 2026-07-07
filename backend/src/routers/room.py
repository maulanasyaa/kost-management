from datetime import date
from typing import Sequence

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from models import account as account_models
from models import contract as contract_models
from models import room as models
from schemas import room as schemas
from sqlalchemy.orm import Session, joinedload
from utils import get_current_user, require_admin

router = APIRouter(prefix="/rooms", tags=["Rooms"])


# utils
def get_room_or_404(room_id: int, db: Session) -> models.Room:
    room = db.query(models.Room).filter(models.Room.id == room_id).first()

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kamar tidak ada"
        )

    return room


# create
@router.post(
    "/", response_model=schemas.RoomCardOut, status_code=status.HTTP_201_CREATED
)
def create_room(
    room: schemas.RoomCreate,
    db: Session = Depends(get_db),
    _: account_models.Account = Depends(require_admin),
) -> schemas.RoomCardOut:
    data = room.model_dump()

    room_number_check = (
        db.query(models.Room)
        .filter(models.Room.room_number == room.room_number)
        .first()
    )

    if room_number_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Kamar sudah ada"
        )

    db_room = models.Room(**data)

    db.add(db_room)
    db.commit()
    db.refresh(db_room)

    return schemas.RoomCardOut(
        id=db_room.id,
        room_number=db_room.room_number,
        room_type=db_room.room_type,
        price=db_room.price,
        status="vacant",
        renter=None,
        contract=None,
    )


# read
@router.get("/", response_model=list[schemas.RoomResponse])
def get_rooms(
    skip: int = 0,
    limit: int = 10,
    current_user: account_models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Sequence[models.Room]:
    rooms = db.query(models.Room).offset(skip).limit(limit).all()

    return rooms


@router.get("/summary", response_model=list[schemas.RoomCardOut])
def get_rooms_summary(
    current_user: account_models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[schemas.RoomCardOut]:

    today = date.today()

    # ambil semua room + contract + renter dalam 1 query (bukan query berulang)
    rooms = (
        db.query(models.Room)
        .options(
            joinedload(models.Room.contracts).joinedload(
                contract_models.Contract.renter
            )
        )
        .all()
    )

    result = []
    for room in rooms:
        # find active contract
        active_contract = next(
            (c for c in room.contracts if c.start_date <= today <= c.end_date),
            None,
        )

        result.append(
            schemas.RoomCardOut(
                id=room.id,
                room_number=room.room_number,
                room_type=room.room_type,
                price=room.price,
                status="occupied" if active_contract else "vacant",
                renter=schemas.RenterOut.model_validate(active_contract.renter)
                if active_contract
                else None,
                contract=schemas.ContractOut.model_validate(active_contract)
                if active_contract
                else None,
            )
        )
    return result


@router.get("/{room_id}", response_model=schemas.RoomResponse)
def get_room(room_id: int, db: Session = Depends(get_db)) -> models.Room:
    room = get_room_or_404(room_id, db)

    return room


# update
@router.patch("/{room_id}", response_model=schemas.RoomCardOut)
def update_room(
    room_id: int, room: schemas.RoomUpdate, db: Session = Depends(get_db)
) -> schemas.RoomCardOut:
    today = date.today()

    db_room = get_room_or_404(room_id, db)

    update_data = room.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_room, key, value)

    db.commit()
    db.refresh(db_room)

    active_contract = next(
        (c for c in db_room.contracts if c.start_date <= today <= c.end_date), None
    )

    result = schemas.RoomCardOut(
        id=db_room.id,
        room_number=db_room.room_number,
        room_type=db_room.room_type,
        price=db_room.price,
        status="occupied" if active_contract else "vacant",
        renter=schemas.RenterOut.model_validate(active_contract.renter)
        if active_contract
        else None,
        contract=schemas.ContractOut.model_validate(active_contract)
        if active_contract
        else None,
    )

    return result


# delete
@router.delete("/{room_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_room(
    room_id: int,
    db: Session = Depends(get_db),
    _: account_models.Account = Depends(require_admin),
) -> None:
    db_room = get_room_or_404(room_id, db)

    if db_room.contracts:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Room ini memiliki kontrak, jangan dihapus!",
        )

    db.delete(db_room)
    db.commit()
