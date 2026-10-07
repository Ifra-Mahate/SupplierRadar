import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000'

function Dashboard({ onLogout }) {

  const [stats, setStats] = useState({
    total_suppliers: 0,
    high_risk: 0,
    medium_risk: 0,
    low_risk: 0
  })

  const [suppliers, setSuppliers] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/api/statistics`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err))

    axios.get(`${API_URL}/api/suppliers`)
      .then(res => setSuppliers(res.data))
      .catch(err => console.log(err))

    axios.get(`${API_URL}/api/alerts`)
      .then(res => setAlerts(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#00e5c3',
        fontSize: '20px'
      }}>
        Loading SupplierRadar...
      </div>
    )
  }

  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">

        <div className="dashboard-brand">
          <div className="brand-icon">
            <span></span>
          </div>
          <span>
            Supplier<span>Radar</span>
          </span>
        </div>

        <div className="sidebar-section">
          <p>MAIN MENU</p>
          <button className="sidebar-link active">
            <span>◈</span>
            Overview
          </button>
          <button className="sidebar-link">
            <span>◎</span>
            Suppliers
          </button>
          <button className="sidebar-link">
            <span>⚠</span>
            Alerts
          </button>
          <button className="sidebar-link">
            <span>◌</span>
            Risk Analysis
          </button>
        </div>

        <div className="sidebar-section">
          <p>INTELLIGENCE</p>
          <button className="sidebar-link">
            <span>◉</span>
            Network Map
          </button>
          <button className="sidebar-link">
            <span>✦</span>
            Recommendations
          </button>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          ← LOG OUT
        </button>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <div className="dashboard-eyebrow">
              SUPPLIER INTELLIGENCE / OVERVIEW
            </div>
            <h1>
              Good morning, <span>Analyst.</span>
            </h1>
            <p>
              Here's the current health of your supplier network.
            </p>
          </div>

          <div className="dashboard-user">
            <div className="user-status">
              <span></span>
              SYSTEM ONLINE
            </div>
            <div className="user-avatar">
              A
            </div>
          </div>
        </header>

        <section className="dashboard-stats">

          <div className="stat-card risk-stat">
            <div className="stat-top">
              <span>HIGH RISK SUPPLIERS</span>
              <b>↗</b>
            </div>
            <div className="stat-value">
              {stats.high_risk}
              <small>/100</small>
            </div>
            <div className="stat-status">
              <span></span>
              {stats.high_risk > 5 ? 'CRITICAL RISK' : 'MODERATE RISK'}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>ACTIVE SUPPLIERS</span>
              <b>◎</b>
            </div>
            <div className="stat-value">
              {stats.total_suppliers}
            </div>
            <div className="stat-description">
              Suppliers monitored
            </div>
          </div>

          <div className="stat-card alert-stat">
            <div className="stat-top">
              <span>ACTIVE ALERTS</span>
              <b>!</b>
            </div>
            <div className="stat-value">
              {alerts.length}
            </div>
            <div className="stat-status warning">
              <span></span>
              REQUIRES ATTENTION
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>LOW RISK SUPPLIERS</span>
              <b>✓</b>
            </div>
            <div className="stat-value">
              {stats.low_risk}
            </div>
            <div className="stat-status healthy">
              <span></span>
              NETWORK STABLE
            </div>
          </div>

        </section>

        <section className="dashboard-middle">

          <div className="dashboard-panel trend-panel">
            <div className="panel-header">
              <div>
                <span>RISK MONITORING</span>
                <h2>Supplier Risk Trend</h2>
              </div>
              <button className="time-button">
                LAST 7 DAYS ▾
              </button>
            </div>

            <div className="fake-chart">
              <div className="chart-labels">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="chart-area">
                <div className="chart-grid-line line-one"></div>
                <div className="chart-grid-line line-two"></div>
                <div className="chart-grid-line line-three"></div>
                <div className="chart-grid-line line-four"></div>

                <svg
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                  className="risk-chart"
                >
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      x2="1"
                    >
                      <stop offset="0%" stopColor="#00e5c3" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>

                  <polyline
                    points="0,170 80,145 160,155 240,105 320,125 400,75 480,92 600,48"
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="4"
                  />

                  <circle cx="600" cy="48" r="6" fill="#00e5c3" />
                </svg>

                <div className="chart-tooltip">
                  RISK SCORE
                  <strong>{stats.high_risk_percentage}%</strong>
                </div>
              </div>
            </div>

            <div className="chart-days">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>

          <div className="dashboard-panel distribution-panel">
            <div className="panel-header">
              <div>
                <span>RISK ANALYSIS</span>
                <h2>Risk Distribution</h2>
              </div>
            </div>

            <div className="risk-visual">
              <div className="risk-donut">
                <div className="donut-inner">
                  <strong>{stats.total_suppliers}</strong>
                  <span>SUPPLIERS</span>
                </div>
              </div>
            </div>

            <div className="risk-legend">
              <div>
                <span className="legend-dot high"></span>
                <p>High Risk</p>
                <strong>{stats.high_risk}</strong>
              </div>
              <div>
                <span className="legend-dot medium"></span>
                <p>Medium Risk</p>
                <strong>{stats.medium_risk}</strong>
              </div>
              <div>
                <span className="legend-dot low"></span>
                <p>Low Risk</p>
                <strong>{stats.low_risk}</strong>
              </div>
            </div>
          </div>

        </section>

        <section className="dashboard-bottom">

          <div className="dashboard-panel alerts-panel">
            <div className="panel-header">
              <div>
                <span>LIVE MONITORING</span>
                <h2>Active Alerts</h2>
              </div>
              <button className="view-all">
                VIEW ALL →
              </button>
            </div>

            <div className="alert-list">
              {alerts.length === 0 ? (
                <div style={{color: '#00e5c3', padding: '10px'}}>
                  No active alerts
                </div>
              ) : (
                alerts.slice(0, 3).map((alert, index) => (
                  <div
                    key={index}
                    className={`dashboard-alert ${
                      alert.alert_level === 'High'
                        ? 'high-alert'
                        : 'medium-alert'
                    }`}
                  >
                    <div className="alert-symbol">
                      {alert.alert_level === 'High' ? '!' : '⚠'}
                    </div>
                    <div>
                      <strong>{alert.supplier_name}</strong>
                      <p>{alert.message}</p>
                    </div>
                    <span className={`alert-time ${
                      alert.alert_level === 'High'
                        ? 'high-alert'
                        : 'medium-alert'
                    }`}>
                      {alert.alert_level}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-panel suppliers-panel">
            <div className="panel-header">
              <div>
                <span>SUPPLIER NETWORK</span>
                <h2>Top Suppliers</h2>
              </div>
              <button className="view-all">
                VIEW ALL →
              </button>
            </div>

            <div className="supplier-list">
              {suppliers.length === 0 ? (
                <div style={{color: '#00e5c3', padding: '10px'}}>
                  Loading suppliers...
                </div>
              ) : (
                suppliers.slice(0, 5).map((supplier, index) => (
                  <div key={index} className="supplier-row">
                    <div className="supplier-name">
                      <span>0{index + 1}</span>
                      <div>
                        <strong>{supplier.name}</strong>
                        <small>{supplier.category}</small>
                      </div>
                    </div>
                    <div className={`supplier-score ${
                      supplier.risk_level === 'High'
                        ? ''
                        : supplier.risk_level === 'Medium'
                        ? 'medium-score'
                        : 'low-score'
                    }`}>
                      <span>{supplier.risk_score}</span>
                      <small>RISK</small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </section>

      </main>

    </div>
  )
}

export default Dashboard