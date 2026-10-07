suppliers = [
    {
        "name": "Tata Steel",
        "category": "Steel",
        "country": "India",
        "risk_score": 2
    },
    {
        "name": "POSCO",
        "category": "Steel",
        "country": "South Korea",
        "risk_score": 3
    },
    {
        "name": "ArcelorMittal",
        "category": "Steel",
        "country": "Luxembourg",
        "risk_score": 4
    },
    {
        "name": "Nucor",
        "category": "Steel",
        "country": "USA",
        "risk_score": 2
    },
    {
        "name": "Jindal Steel",
        "category": "Steel",
        "country": "India",
        "risk_score": 5
    }
]


def get_recommendations(supplier: str):

    current_supplier = None

    for item in suppliers:
        if item["name"].lower() == supplier.lower():
            current_supplier = item
            break

    if current_supplier is None:
        return {
            "supplier": supplier,
            "recommendations": []
        }

    alternatives = [
        item for item in suppliers
        if item["category"] == current_supplier["category"]
        and item["country"] != current_supplier["country"]
        and item["name"] != current_supplier["name"]
    ]

    alternatives.sort(key=lambda x: x["risk_score"])

    return {
        "supplier": supplier,
        "recommendations": alternatives[:3]
    }