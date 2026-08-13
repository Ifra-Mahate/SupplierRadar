from fastapi import FastAPI
from news_api import get_supplier_news

app = FastAPI()


@app.get("/api/news/{supplier}")
def supplier_news(supplier: str):
    return get_supplier_news(supplier)