
from news_api import get_supplier_risk_score
from sanctions_api import check_sanctions
from weather_api import get_weather_risk_score


# =========================================================
# SUPPLIER DATABASE
# =========================================================

SUPPLIERS = {
    "Tata Steel": {
        "country": "India",
        "category": "Steel",
        "city": "Jamshedpur"
    },

    "ArcelorMittal": {
        "country": "Luxembourg",
        "category": "Steel",
        "city": "Luxembourg"
    },

    "POSCO": {
        "country": "South Korea",
        "category": "Steel",
        "city": "Pohang"
    },

    "Nucor": {
        "country": "USA",
        "category": "Steel",
        "city": "Charlotte"
    },

    "Reliance Industries": {
        "country": "India",
        "category": "Energy",
        "city": "Mumbai"
    },

    "Infosys": {
        "country": "India",
        "category": "IT",
        "city": "Bengaluru"
    },

    "Larsen & Toubro": {
        "country": "India",
        "category": "Engineering",
        "city": "Mumbai"
    }
}


# =========================================================
# SUPPLIER RISK CALCULATION
# =========================================================

def calculate_supplier_risk(supplier: str):

    supplier_data = SUPPLIERS.get(supplier)

    if supplier_data is None:
        return {
            "supplier": supplier,
            "error": "Supplier not found"
        }

    city = supplier_data["city"]

    try:

        # -------------------------
        # NEWS RISK
        # -------------------------

        news_data = get_supplier_risk_score(supplier)
        news_risk = news_data.get("risk_percentage", 0)

        # -------------------------
        # SANCTIONS RISK
        # -------------------------

        sanctions_data = check_sanctions(supplier)

        if sanctions_data.get("sanctioned", False):
            sanctions_risk = 100
        else:
            sanctions_risk = 0

        # -------------------------
        # WEATHER RISK
        # -------------------------

        weather_data = get_weather_risk_score(city)

        weather_score = weather_data.get(
            "weather_risk_score",
            0
        )

        weather_risk = weather_score * 10

        # -------------------------
        # OVERALL RISK
        # -------------------------

        overall_score = (
            news_risk * 0.40
            + sanctions_risk * 0.40
            + weather_risk * 0.20
        )

        # -------------------------
        # RISK LEVEL
        # -------------------------

        if overall_score <= 25:
            risk_level = "Low"

        elif overall_score <= 50:
            risk_level = "Medium"

        elif overall_score <= 75:
            risk_level = "High"

        else:
            risk_level = "Critical"

        return {
            "supplier": supplier,
            "city": city,
            "country": supplier_data["country"],
            "category": supplier_data["category"],
            "overall_risk_score": round(overall_score, 2),
            "risk_level": risk_level,
            "news_risk": news_risk,
            "sanctions_risk": sanctions_risk,
            "weather_risk": weather_risk
        }

    except Exception as e:

        return {
            "supplier": supplier,
            "error": str(e)
        }


# =========================================================
# RECOMMENDATION SYSTEM
# =========================================================

def get_supplier_recommendations(
    supplier: str,
    top_n: int = 3
):

    current_supplier = SUPPLIERS.get(supplier)

    if current_supplier is None:
        return {
            "supplier": supplier,
            "error": "Supplier not found"
        }

    current_risk = calculate_supplier_risk(supplier)

    if "error" in current_risk:
        return current_risk

    # Recommendations only for High/Critical suppliers

    if current_risk["risk_level"] not in [
        "High",
        "Critical"
    ]:

        return {
            "supplier": supplier,
            "current_risk_score":
                current_risk["overall_risk_score"],

            "current_risk_level":
                current_risk["risk_level"],

            "message":
                "Supplier risk is not high. No alternatives required.",

            "recommendations": []
        }

    candidates = []

    for candidate_name, candidate_data in SUPPLIERS.items():

        # Don't recommend the same supplier
        if candidate_name == supplier:
            continue

        # Same category required
        if candidate_data["category"] != current_supplier["category"]:
            continue

        # Different country required
        if candidate_data["country"] == current_supplier["country"]:
            continue

        candidate_risk = calculate_supplier_risk(
            candidate_name
        )

        if "error" in candidate_risk:
            continue

        candidates.append({
            "supplier": candidate_name,
            "country": candidate_data["country"],
            "category": candidate_data["category"],
            "city": candidate_data["city"],
            "risk_score":
                candidate_risk["overall_risk_score"],
            "risk_level":
                candidate_risk["risk_level"]
        })

    # Lowest risk first
    candidates.sort(
        key=lambda x: x["risk_score"]
    )

    recommendations = candidates[:top_n]

    return {
        "supplier": supplier,
        "current_risk_score":
            current_risk["overall_risk_score"],
        "current_risk_level":
            current_risk["risk_level"],
        "recommendations": recommendations
    }


# =========================================================
# ALERT GENERATOR
# =========================================================

def generate_alert(supplier: str):

    risk_data = calculate_supplier_risk(supplier)

    if "error" in risk_data:

        return {
            "supplier": supplier,
            "error": risk_data["error"]
        }

    score = risk_data["overall_risk_score"]

    # HIGH ALERT
    if score > 70:

        alert_level = "High"

        message = (
            f"{supplier} has a HIGH RISK score of {score}. "
            "Immediate action is recommended."
        )

    # MEDIUM ALERT
    elif score >= 40:

        alert_level = "Medium"

        message = (
            f"{supplier} has a MEDIUM RISK score of {score}. "
            "Supplier should be monitored."
        )

    # LOW ALERT
    else:

        alert_level = "Low"

        message = (
            f"{supplier} has a LOW RISK score of {score}. "
            "No immediate action required."
        )

    return {
        "supplier": supplier,
        "risk_score": score,
        "risk_level": risk_data["risk_level"],
        "alert_level": alert_level,
        "message": message
    }


# =========================================================
# TEST
# =========================================================

if __name__ == "__main__":

    # -------------------------
    # SUPPLIER RISK TEST
    # -------------------------

    print("\n==============================")
    print("SUPPLIER RISK TEST")
    print("==============================")

    risk = calculate_supplier_risk("Tata Steel")

    print(risk)


    # -------------------------
    # RECOMMENDATION TEST
    # -------------------------

    print("\n==============================")
    print("RECOMMENDATION TEST")
    print("==============================")

    recommendations = get_supplier_recommendations(
        "Tata Steel"
    )

    print(recommendations)


    # -------------------------
    # ALERT TEST
    # -------------------------

    print("\n==============================")
    print("ALERT TEST")
    print("==============================")

    alert = generate_alert("Tata Steel")

    print(alert)
