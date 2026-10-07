import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(city: str):

    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }

    response = requests.get(
        WEATHER_URL,
        params=params,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    return {
        "city": city,
        "temperature": data["main"]["temp"],
        "weather": data["weather"][0]["main"],
        "description": data["weather"][0]["description"]
    }
def get_weather_risk_score(city: str):

    weather_data = get_weather(city)
    weather = weather_data["weather"].lower()
    description = weather_data["description"].lower()

    if "tornado" in weather or "thunderstorm" in weather:
        risk_score = 10

    elif "rain" in weather or "rain" in description:
        risk_score = 7

    elif "clear" in weather or "cloud" in weather:
        risk_score = 2

    else:
        risk_score = 3

    return {
        "city": city,
        "weather": weather_data["weather"],
        "description": weather_data["description"],
        "temperature": weather_data["temperature"],
        "weather_risk_score": risk_score
    }