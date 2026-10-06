from fastapi import FastAPI
from news_api import get_supplier_news,get_supplier_risk_score

app = FastAPI()


@app.get("/api/news/{supplier}")
def supplier_news(supplier: str):
    return get_supplier_news(supplier)


@app.get("/api/risk-score/{supplier}")
def supplier_risk_score(supplier: str):
    return get_supplier_risk_score(supplier)

@app.get("/api/suppliers")
def get_suppliers():
    return {
        "suppliers": [
            "Tata Steel",
            "Reliance Industries",
            "Infosys",
            "Larsen & Toubro"
        ]
    }