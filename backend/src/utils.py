import os
from pathlib import Path

import jwt
from database import get_db
from dotenv import load_dotenv
from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from models import account as models
from schemas import account as schemas
from sqlalchemy.orm import Session

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

SECRET_JWT = os.environ.get("SECRET_JWT")
if not SECRET_JWT:
    raise ValueError("SECRET_JWT is missing from environment variables")

ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user(account_id: int, db: Session) -> models.Account:
    account = db.query(models.Account).filter(models.Account.id == account_id).first()

    return account


def get_current_user(token: str = Cookie(default=None), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if token is None:
        raise credentials_exception

    try:
        payload = jwt.decode(token, SECRET_JWT, algorithms=[ALGORITHM])
        account_id = payload.get("id")
        if account_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(id=account_id)
    except InvalidTokenError:
        raise credentials_exception

    current_user = get_user(account_id=token_data.id, db=db)
    if current_user is None:
        raise credentials_exception

    return current_user


def require_admin(current_user: models.Account = Depends(get_current_user)):
    if current_user.role != models.AccountRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Tidak punya akses"
        )

    return current_user
