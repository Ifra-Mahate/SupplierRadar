import csv
import io
import requests

OFAC_URL = "https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/SDN.CSV"


def check_sanctions(supplier: str):

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(
        OFAC_URL,
        headers=headers,
        timeout=20
    )

    response.raise_for_status()

    text = response.content.decode("utf-8-sig")

    supplier_name = supplier.lower().strip()

    reader = csv.reader(io.StringIO(text))

    for row in reader:
        if len(row) > 1:
            sdn_name = row[1].strip().lower()

            if supplier_name in sdn_name or sdn_name in supplier_name:
                return {
                    "supplier": supplier,
                    "sanctioned": True,
                    "matched_name": row[1]
                }

    return {
        "supplier": supplier,
        "sanctioned": False,
        "matched_name": None
    }