from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import account as account_models
from models import room as models
from schemas import room as schemas
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
    "/", response_model=schemas.RoomResponse, status_code=status.HTTP_201_CREATED
)
def create_room(
    room: schemas.RoomCreate,
    db: Session = Depends(get_db),
    _: account_models.Account = Depends(require_admin),
) -> models.Room:
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

    return db_room


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


@router.get("/{room_id}", response_model=schemas.RoomResponse)
def get_room(room_id: int, db: Session = Depends(get_db)) -> models.Room:
    room = get_room_or_404(room_id, db)

    return room


# update
@router.patch("/{room_id}", response_model=schemas.RoomResponse)
def update_room(
    room_id: int, room: schemas.RoomUpdate, db: Session = Depends(get_db)
) -> models.Room:
    db_room = get_room_or_404(room_id, db)

    update_data = room.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_room, key, value)

    db.commit()
    db.refresh(db_room)

    return db_room


# delete
@router.delete("/{room_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_room(room_id: int, db: Session = Depends(get_db)) -> None:
    db_room = get_room_or_404(room_id, db)

    db.delete(db_room)
    db.commit()
