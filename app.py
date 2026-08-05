from flask import Flask, jsonify, request
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
    risk_score = db.Column(db.Float, default=0)
    risk_level = db.Column(db.String(20), default="Low")

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    message = db.Column(db.Text)
    alert_level = db.Column(db.String(20))
    is_read = db.Column(db.Boolean, default=False)

def calculate_risk(supplier_id):
    random.seed(supplier_id * 7)
    score = random.randint(0, 100)
    if score > 70:
        level = "High"
    elif score >= 40:
        level = "Medium"
    else:
        level = "Low"
    return score, level

@app.route('/')
def home():
    return jsonify({
        "message": "SupplierRadar Backend Running!",
        "status": "success",
        "total_suppliers": Supplier.query.count()
    })

@app.route('/api/suppliers')
def get_suppliers():
    search = request.args.get('search', '')
    country = request.args.get('country', '')
    category = request.args.get('category', '')
    
    query = Supplier.query
    
    if search:
        query = query.filter(
            Supplier.name.ilike(f'%{search}%')
        )
    if country:
        query = query.filter(
            Supplier.country.ilike(f'%{country}%')
        )
    if category:
        query = query.filter(
            Supplier.category.ilike(f'%{category}%')
        )
    
    suppliers = query.all()
    result = []
    for s in suppliers:
        score, level = calculate_risk(s.id)
        result.append({
            "id": s.id,
            "name": s.name,
            "country": s.country,
            "category": s.category,
            "city": s.city,
            "spend_percent": s.spend_percent,
            "risk_score": score,
            "risk_level": level
        })
    return jsonify(result)

@app.route('/api/suppliers/<int:id>')
def get_supplier(id):
    supplier = Supplier.query.get(id)
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    
    score, level = calculate_risk(id)
    
    if level == "High":
        reasons = [
            "Negative news detected in region",
            "Port congestion above normal",
            "Trade volume dropped 25%"
        ]
    elif level == "Medium":
        reasons = [
            "Weather warning in supplier region",
            "Minor delays reported"
        ]
    else:
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
        "risk_score": score,
        "risk_level": level,
        "reasons": reasons
    })

@app.route('/api/risk-scores')
def get_risk_scores():
    suppliers = Supplier.query.all()
    result = []
    for s in suppliers:
        score, level = calculate_risk(s.id)
        result.append({
            "supplier_id": s.id,
            "supplier_name": s.name,
            "country": s.country,
            "risk_score": score,
            "risk_level": level
        })
    return jsonify(result)

@app.route('/api/alerts')
def get_alerts():
    suppliers = Supplier.query.all()
    alerts = []
    for s in suppliers:
        score, level = calculate_risk(s.id)
        if level == "High":
            alerts.append({
                "supplier_name": s.name,
                "country": s.country,
                "risk_score": score,
                "alert_level": "High",
                "message": f"{s.name} is at HIGH RISK! Immediate action required.",
                "is_read": False
            })
        elif level == "Medium":
            alerts.append({
                "supplier_name": s.name,
                "country": s.country,
                "risk_score": score,
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
            score, level = calculate_risk(s.id)
            if level == "Low":
                alternatives.append({
                    "id": s.id,
                    "name": s.name,
                    "country": s.country,
                    "category": s.category,
                    "risk_score": score,
                    "risk_level": level
                })
    return jsonify(alternatives[:3])

@app.route('/api/supplier-email/<int:id>')
def generate_supplier_email(id):
    supplier = Supplier.query.get(id)
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    
    email = f"""Dear {supplier.name} Team,

We are conducting our regular 
supply chain health assessment.

We have noticed some regional 
developments near {supplier.city}, 
{supplier.country} including:
- Weather patterns in your region
- Regional logistics updates

Could you please confirm:
1. Current production capacity
2. Expected delivery status
3. Any operational challenges

We value our partnership and 
want to ensure smooth operations.

Best regards,
Supply Chain Team"""
    
    return jsonify({
        "supplier_name": supplier.name,
        "supplier_country": supplier.country,
        "supplier_city": supplier.city,
        "email_draft": email
    })

@app.route('/api/statistics')
def get_statistics():
    suppliers = Supplier.query.all()
    
    total = len(suppliers)
    high = 0
    medium = 0
    low = 0
    
    country_risk = {}
    category_risk = {}
    
    for s in suppliers:
        score, level = calculate_risk(s.id)
        
        if level == "High":
            high += 1
        elif level == "Medium":
            medium += 1
        else:
            low += 1
        
        if s.country not in country_risk:
            country_risk[s.country] = []
        country_risk[s.country].append(score)
        
        if s.category not in category_risk:
            category_risk[s.category] = []
        category_risk[s.category].append(score)
    
    most_risky_country = max(
        country_risk,
        key=lambda x: sum(country_risk[x]) / len(country_risk[x])
    )
    
    most_risky_category = max(
        category_risk,
        key=lambda x: sum(category_risk[x]) / len(category_risk[x])
    )
    
    return jsonify({
        "total_suppliers": total,
        "high_risk": high,
        "medium_risk": medium,
        "low_risk": low,
        "most_risky_country": most_risky_country,
        "most_risky_category": most_risky_category,
        "risk_percentage": {
            "high": round(high/total*100, 1),
            "medium": round(medium/total*100, 1),
            "low": round(low/total*100, 1)
        }
    })
@app.route('/api/suppliers', methods=['POST'])
def add_supplier():
    data = request.json
    
    new_supplier = Supplier(
        name=data['name'],
        country=data['country'],
        category=data['category'],
        city=data['city'],
        spend_percent=data['spend_percent']
    )
    
    db.session.add(new_supplier)
    db.session.commit()
    
    return jsonify({
        "message": "Supplier added successfully!",
        "id": new_supplier.id,
        "name": new_supplier.name
    })

@app.route('/api/suppliers/<int:id>', methods=['DELETE'])
def delete_supplier(id):
    supplier = Supplier.query.get(id)
    
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    
    db.session.delete(supplier)
    db.session.commit()
    
    return jsonify({
        "message": f"{supplier.name} deleted successfully!"
    })
@app.route('/api/risk-history/<int:id>')
def get_risk_history(id):
    supplier = Supplier.query.get(id)
    if not supplier:
        return jsonify({
            "error": "Supplier not found"
        }), 404
    
    history = []
    weeks = ["Week 1", "Week 2", "Week 3", 
             "Week 4", "Week 5", "Week 6",
             "Week 7", "Week 8", "Week 9",
             "Week 10", "Week 11", "Week 12"]
    
    for i, week in enumerate(weeks):
        random.seed(id * 7 + i)
        score = random.randint(0, 100)
        if score > 70:
            level = "High"
        elif score >= 40:
            level = "Medium"
        else:
            level = "Low"
        
        history.append({
            "week": week,
            "risk_score": score,
            "risk_level": level
        })
    
    return jsonify({
        "supplier_name": supplier.name,
        "supplier_country": supplier.country,
        "history": history
    })
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if Supplier.query.count() == 0:
            suppliers = [
                Supplier(name="Vietnam Plastics Co", country="Vietnam", category="Plastic Parts", city="Ho Chi Minh City", spend_percent=8.0),
                Supplier(name="Taiwan Chip Corp", country="Taiwan", category="Semiconductors", city="Taipei", spend_percent=7.0),
                Supplier(name="China Steel Ltd", country="China", category="Steel", city="Shanghai", spend_percent=6.0),
                Supplier(name="Bangladesh Textile", country="Bangladesh", category="Fabric", city="Dhaka", spend_percent=5.0),
                Supplier(name="Malaysia Rubber Corp", country="Malaysia", category="Rubber Parts", city="Kuala Lumpur", spend_percent=5.0),
                Supplier(name="India Auto Parts Ltd", country="India", category="Auto Components", city="Pune", spend_percent=6.0),
                Supplier(name="South Korea Battery", country="South Korea", category="Batteries", city="Seoul", spend_percent=7.0),
                Supplier(name="Japan Camera Module", country="Japan", category="Camera Parts", city="Tokyo", spend_percent=5.0),
                Supplier(name="Thailand Electronics", country="Thailand", category="Circuit Boards", city="Bangkok", spend_percent=4.0),
                Supplier(name="Indonesia Textiles", country="Indonesia", category="Fabric", city="Jakarta", spend_percent=4.0),
                Supplier(name="Germany Machinery Co", country="Germany", category="Industrial Machines", city="Munich", spend_percent=5.0),
                Supplier(name="Italy Leather Goods", country="Italy", category="Leather", city="Milan", spend_percent=3.0),
                Supplier(name="Poland Auto Parts", country="Poland", category="Auto Components", city="Warsaw", spend_percent=4.0),
                Supplier(name="France Chemicals Ltd", country="France", category="Chemicals", city="Paris", spend_percent=3.0),
                Supplier(name="UAE Logistics Corp", country="UAE", category="Logistics", city="Dubai", spend_percent=4.0),
                Supplier(name="Turkey Steel Works", country="Turkey", category="Steel", city="Istanbul", spend_percent=3.0),
                Supplier(name="Mexico Auto Corp", country="Mexico", category="Auto Components", city="Mexico City", spend_percent=5.0),
                Supplier(name="Brazil Steel Ltd", country="Brazil", category="Steel", city="Sao Paulo", spend_percent=4.0),
                Supplier(name="USA Tech Components", country="USA", category="Semiconductors", city="San Jose", spend_percent=6.0),
                Supplier(name="South Africa Mining", country="South Africa", category="Raw Materials", city="Johannesburg", spend_percent=3.0),
            ]
            db.session.add_all(suppliers)
            db.session.commit()
            print("20 suppliers added!")
        else:
            print("Suppliers already exist!")
    app.run(debug=True)