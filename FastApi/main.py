from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated,List
from pydantic import BaseModel, ConfigDict

from FastApi import models
from FastApi.database import SessionLocal, engine


app = FastAPI()
origins = [
    "http://localhost:3000",
    "https://finance-5w2x55bxu-mohammad-shoaibs-projects-7578a7dd.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date: str

class TransactionModel(TransactionBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(
    transaction: TransactionBase,
    db: db_dependency
):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db:db_dependency,skip:int=0, limit:int=100):
    transactions=db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions