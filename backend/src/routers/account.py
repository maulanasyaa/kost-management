import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

import bcrypt
import jwt
from database import get_db
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Response, status
from models import account as models
from models import renter as renter_models
from models.account import AccountRole
from schemas import account as schemas
from sqlalchemy.orm import Session
from utils import get_current_user

load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

router = APIRouter(prefix="/accounts", tags=["Accounts"])

SECRET_JWT = os.environ.get("SECRET_JWT")
if not SECRET_JWT:
    raise ValueError("SECRET_JWT is missing from environment variables")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# utils
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encode_jwt = jwt.encode(to_encode, SECRET_JWT, algorithm=ALGORITHM)
    return encode_jwt


# register
@router.post("/register", response_model=schemas.AccountRegisterResponse)
def register_account(
    account: schemas.AccountRegister, db: Session = Depends(get_db)
) -> models.Account:
    data = account.model_dump()

    renter_avail_check = (
        db.query(renter_models.Renter)
        .filter(renter_models.Renter.id == account.renter_id)
        .first()
    )

    if not renter_avail_check:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Renter tidak ditemukan."
        )

    account_avail_check = (
        db.query(models.Account)
        .filter(models.Account.renter_id == account.renter_id)
        .first()
    )
    if account_avail_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Renter sudah memiliki akun."
        )

    email_used_check = (
        db.query(models.Account).filter(models.Account.email == account.email).first()
    )

    if email_used_check:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email sudah digunakan."
        )

    # hashing
    account_pass_hash = bcrypt.hashpw(
        account.password.encode("utf-8"), bcrypt.gensalt()
    )
    data["password"] = account_pass_hash.decode("utf-8")

    # role
    data["role"] = AccountRole.RENTER

    db_account = models.Account(**data)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return db_account


# login
@router.post("/login", response_model=schemas.LoginResponse)
def account_login(
    account: schemas.AccountLogin, response: Response, db: Session = Depends(get_db)
):

    account_by_email = (
        db.query(models.Account).filter(models.Account.email == account.email).first()
    )

    if account_by_email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Akun dengan email ini tidak ada",
        )

    pw_check = bcrypt.checkpw(
        account.password.encode("utf-8"), account_by_email.password.encode("utf-8")
    )

    if not pw_check:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Password salah"
        )

    token_payload = {
        "id": account_by_email.id,
        "role": account_by_email.role.value,
    }
    access_token = create_access_token(token_payload)

    response.set_cookie(key="token", value=access_token, httponly=True, samesite="lax")

    return {"message": "Login berhasil."}


# get active account
@router.get("/me", response_model=schemas.AccountMe)
def get_active_user(current_user: models.Account = Depends(get_current_user)):
    return current_user


# logout
@router.post("/logout")
def logout_account(response: Response, current_user=Depends(get_current_user)):
    response.delete_cookie(key="token")
    return {"message": "Berhasil Logout"}
