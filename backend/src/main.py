from fastapi import FastAPI

from database import Base, engine
from models import account, contract, renter, room, transactions
from routers import account as account_router
from routers import contract as contract_router
from routers import renter as renter_router
from routers import room as room_router
from routers import transactions as transactions_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kost Management API",
    description="API sederhana untuk mengelola kamar kost",
    version="1.0.0",
)

app.include_router(room_router.router)
app.include_router(renter_router.router)
app.include_router(contract_router.router)
app.include_router(transactions_router.router)
app.include_router(account_router.router)


@app.get("/")
def read_root():
    return {
        "message": "Selamat datang di API Kost Management!",
        "docs": "Buka /docs untuk melihat dokumentasi API",
    }
