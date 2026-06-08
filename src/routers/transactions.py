from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import contract as contract_models
from models import transactions as models
from schemas import transactions as schemas

router = APIRouter(prefix="/transactions", tags=["Transactions"])


# utils
def get_transaction_or_404(transaction_id: int, db: Session) -> models.Transaction:
    transaction = (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )

    if transaction is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaksi tidak ada"
        )

    return transaction


# create
@router.post(
    "/", response_model=schemas.TransactionResponse, status_code=status.HTTP_201_CREATED
)
def create_transaction(
    transaction: schemas.TransactionCreate, db: Session = Depends(get_db)
) -> models.Transaction:
    data = transaction.model_dump()

    contract_id = transaction.contract_id

    contract_check = (
        db.query(contract_models.Contract)
        .filter(contract_models.Contract.id == contract_id)
        .first()
    )

    if contract_check is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kontrak tidak ada"
        )

    duplicate_check = (
        db.query(models.Transaction)
        .filter(models.Transaction.contract_id == contract_id)
        .first()
    )

    if duplicate_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Transaksi sudah ada"
        )

    data["amount"] = contract_check.price
    db_transaction = models.Transaction(**data)

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


# read
@router.get("/", response_model=list[schemas.TransactionResponse])
def get_transactions(
    skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
) -> Sequence[models.Transaction]:
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()

    return transactions


@router.get("/{transaction_id}", response_model=schemas.TransactionResponse)
def get_transaction(
    transaction_id: int, db: Session = Depends(get_db)
) -> models.Transaction:
    transaction = get_transaction_or_404(transaction_id, db)

    return transaction


# update
@router.patch("/{transaction_id}", response_model=schemas.TransactionResponse)
def update_transaction(
    transaction_id: int,
    transaction: schemas.TransactionUpdate,
    db: Session = Depends(get_db),
) -> models.Transaction:
    db_transaction = get_transaction_or_404(transaction_id, db)

    update_data = transaction.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_transaction, key, value)

    db.commit()
    db.refresh(db_transaction)

    return db_transaction


@router.patch("/{transaction_id}/pay", response_model=schemas.TransactionResponse)
def set_paid(
    transaction_id: int,
    db: Session = Depends(get_db),
) -> models.Transaction:
    db_transaction = get_transaction_or_404(transaction_id, db)

    contract_id = db_transaction.contract_id

    paid_check = (
        db.query(models.Transaction)
        .filter(models.Transaction.contract_id == contract_id)
        .filter(models.Transaction.is_paid)
        .first()
    )

    if paid_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Sudah di bayar"
        )
    setattr(db_transaction, "is_paid", True)

    db.commit()
    db.refresh(db_transaction)

    return db_transaction


# delete
@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)) -> None:
    transaction = get_transaction_or_404(transaction_id, db)

    db.delete(transaction)
    db.commit()


# nested routes
@router.get(
    "/contracts/{contract_id}/transactions",
    response_model=list[schemas.TransactionResponse],
)
def get_transactions_by_contract(
    contract_id: int, db: Session = Depends(get_db)
) -> Sequence[models.Transaction]:
    contract_check = (
        db.query(contract_models.Contract)
        .filter(contract_models.Contract.id == contract_id)
        .first()
    )

    if contract_check is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Kontrak tidak ada"
        )

    transactions = (
        db.query(models.Transaction)
        .filter(models.Transaction.contract_id == contract_id)
        .all()
    )

    return transactions
