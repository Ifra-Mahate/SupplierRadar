from fastapi import FastAPI
from news_api import get_supplier_news,get_supplier_risk_score
from weather_api import get_weather_risk_score
from recommendation import get_recommendations
from sanctions_api import check_sanctions
from risk_engine import calculate_supplier_risk

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
    {
        "name": "Tata Steel",
        "city": "Jamshedpur"
    },
    {
        "name": "Reliance Industries",
        "city": "Mumbai"
    },
    {
        "name": "Infosys",
        "city": "Bengaluru"
    },
    {
        "name": "Larsen & Toubro",
        "city": "Mumbai"
    }
]
    }
@app.get("/api/weather-risk/{city}")
def weather_risk(city: str):
    return get_weather_risk_score(city)

@app.get("/api/alternatives/{supplier}")
def alternatives(supplier: str):
    return get_recommendations(supplier)

@app.get("/api/sanctions/{supplier}")
def supplier_sanctions(supplier: str):
    return check_sanctions(supplier)

@app.get("/api/overall-risk/{supplier}")
def overall_risk(supplier: str):
    return calculate_supplier_risk(supplier)