import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

import bcrypt
import models
from schemas import account as schemas
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

BASE_DIR = Path(__file__).resolve().parent
DATABASE_URL = f"sqlite:///{BASE_DIR}/kost-management.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


def create_admin_account(account: schemas.AccountRegister) -> models.Account:
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    data = account.model_dump()

    account_avail_check = (
        db.query(models.account.Account)
        .filter(models.account.Account.email == account.email)
        .first()
    )

    if account_avail_check:
        print("Akun dengan email tersebut sudah ada.")
        return account_avail_check

    data["role"] = models.account.AccountRole.ADMIN

    # hashing
    account_pass_hash = bcrypt.hashpw(
        account.password.encode("utf-8"), bcrypt.gensalt()
    )
    data["password"] = account_pass_hash.decode("utf-8")

    db_account = models.account.Account(**data)

    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    print("Berhasil membuat akun admin dengan email:", db_account.email)

    return db_account


if __name__ == "__main__":
    data = schemas.AccountRegister(email="maul@mail.com", password="123")
    create_admin_account(data)
