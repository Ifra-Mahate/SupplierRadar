from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///supplierradar.db'
app.config['SECRET_KEY'] = 'supplierradar2024'
db = SQLAlchemy(app)

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(50))
    category = db.Column(db.String(50))
    city = db.Column(db.String(50))
    spend_percent = db.Column(db.Float)

class RiskScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    risk_score = db.Column(db.Float)
    risk_level = db.Column(db.String(20))

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    message = db.Column(db.Text)
    alert_level = db.Column(db.String(20))
    is_read = db.Column(db.Boolean, default=False)

@app.route('/')
def home():
    return jsonify({
        "message": "SupplierRadar Backend Running!",
        "status": "success"
    })

@app.route('/api/suppliers')
def get_suppliers():
    suppliers = Supplier.query.all()
    result = []
    for s in suppliers:
        result.append({
            "id": s.id,
            "name": s.name,
            "country": s.country,
            "category": s.category,
            "city": s.city,
            "spend_percent": s.spend_percent
        })
    return jsonify(result)

@app.route('/api/suppliers/<int:id>')
def get_supplier(id):
    supplier = Supplier.query.get(id)
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    risk_score = random.randint(0, 100)
    if risk_score > 70:
        risk_level = "High"
        reasons = [
            "Negative news detected in region",
            "Port congestion above normal",
            "Trade volume dropped 25%"
        ]
    elif risk_score >= 40:
        risk_level = "Medium"
        reasons = [
            "Weather warning in supplier region",
            "Minor delays reported"
        ]
    else:
        risk_level = "Low"
        reasons = [
            "No major risks detected",
            "Normal operations"
        ]
    return jsonify({
        "id": supplier.id,
        "name": supplier.name,
        "country": supplier.country,
        "category": supplier.category,
        "city": supplier.city,
        "spend_percent": supplier.spend_percent,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "reasons": reasons
    })

@app.route('/api/risk-scores')
def get_risk_scores():
    suppliers = Supplier.query.all()
    result = []
    for s in suppliers:
        risk_score = random.randint(0, 100)
        if risk_score > 70:
            risk_level = "High"
        elif risk_score >= 40:
            risk_level = "Medium"
        else:
            risk_level = "Low"
        result.append({
            "supplier_id": s.id,
            "supplier_name": s.name,
            "country": s.country,
            "risk_score": risk_score,
            "risk_level": risk_level
        })
    return jsonify(result)

@app.route('/api/alerts')
def get_alerts():
    suppliers = Supplier.query.all()
    alerts = []
    for s in suppliers:
        risk_score = random.randint(0, 100)
        if risk_score > 70:
            alerts.append({
                "supplier_name": s.name,
                "country": s.country,
                "risk_score": risk_score,
                "alert_level": "High",
                "message": f"{s.name} is at HIGH RISK! Immediate action required.",
                "is_read": False
            })
        elif risk_score >= 40:
            alerts.append({
                "supplier_name": s.name,
                "country": s.country,
                "risk_score": risk_score,
                "alert_level": "Medium",
                "message": f"{s.name} is at MEDIUM RISK. Monitor closely.",
                "is_read": False
            })
    return jsonify(alerts)

@app.route('/api/alternatives/<int:id>')
def get_alternatives(id):
    supplier = Supplier.query.get(id)
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    all_suppliers = Supplier.query.all()
    alternatives = []
    for s in all_suppliers:
        if s.id != supplier.id and s.country != supplier.country:
            risk_score = random.randint(0, 40)
            alternatives.append({
                "id": s.id,
                "name": s.name,
                "country": s.country,
                "category": s.category,
                "risk_score": risk_score,
                "risk_level": "Low"
            })
    return jsonify(alternatives[:3])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if Supplier.query.count() == 0:
            suppliers = [
                Supplier(name="Vietnam Plastics Co", country="Vietnam", category="Plastic Parts", city="Ho Chi Minh City", spend_percent=30.0),
                Supplier(name="Taiwan Chip Corp", country="Taiwan", category="Semiconductors", city="Taipei", spend_percent=25.0),
                Supplier(name="China Steel Ltd", country="China", category="Steel", city="Shanghai", spend_percent=20.0),
                Supplier(name="Bangladesh Textile", country="Bangladesh", category="Fabric", city="Dhaka", spend_percent=15.0),
                Supplier(name="Malaysia Rubber Corp", country="Malaysia", category="Rubber Parts", city="Kuala Lumpur", spend_percent=10.0),
            ]
            db.session.add_all(suppliers)
            db.session.commit()
            print("5 suppliers added!")
        else:
            print("Suppliers already exist!")
    app.run(debug=True)