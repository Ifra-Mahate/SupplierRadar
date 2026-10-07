import './App.css'
function Alerts({
  onBack,
  onSuppliers,
  onRiskAnalysis,
  onNetworkMap,
  onRecommendations
}) {

  const alerts = [
    {
      title: 'Severe Weather Warning',
      supplier: 'Global Components',
      location: 'Mumbai, India',
      type: 'WEATHER',
      severity: 'CRITICAL',
      time: '12 min ago',
      description:
        'Heavy rainfall and flooding risk detected near supplier location.'
    },
    {
      title: 'Port Congestion Detected',
      supplier: 'Nova Materials',
      location: 'Pune, India',
      type: 'LOGISTICS',
      severity: 'HIGH',
      time: '38 min ago',
      description:
        'Significant increase in shipment delays reported across the region.'
    },
    {
      title: 'Supplier Risk Increased',
      supplier: 'Vertex Logistics',
      location: 'Delhi, India',
      type: 'RISK',
      severity: 'HIGH',
      time: '1 hr ago',
      description:
        'Supplier risk score increased from 52 to 61 based on recent signals.'
    },
    {
      title: 'Market Disruption Signal',
      supplier: 'Apex Manufacturing',
      location: 'Bengaluru, India',
      type: 'MARKET',
      severity: 'MEDIUM',
      time: '2 hrs ago',
      description:
        'New market volatility detected in the supplier operating region.'
    },
    {
      title: 'Normal Operations Restored',
      supplier: 'Prime Industrial',
      location: 'Chennai, India',
      type: 'STATUS',
      severity: 'LOW',
      time: '4 hrs ago',
      description:
        'Previously detected logistics disruption has returned to normal.'
    }
  ]

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}

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

          <button
            className="sidebar-link"
            onClick={onBack}
          >
            <span>◈</span>
            Overview
          </button>

         <button
  className="sidebar-link"
  onClick={onSuppliers}
>
  <span>◎</span>
  Suppliers
</button>

          <button className="sidebar-link active">
            <span>⚠</span>
            Alerts
          </button>

         <button
  className="sidebar-link"
  onClick={onRiskAnalysis}
>
  <span>◌</span>
  Risk Analysis
</button>
        </div>

        <div className="sidebar-section">
          <p>INTELLIGENCE</p>

         <button
  className="sidebar-link"
  onClick={onNetworkMap}
>
  <span>◉</span>
  Network Map
</button>

         <button
  className="sidebar-link"
  onClick={onRecommendations}
>
  <span>✦</span>
  Recommendations
</button>
        </div>

        <button
          className="logout-button"
          onClick={onBack}
        >
          ← BACK
        </button>

      </aside>


      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>

            <div className="dashboard-eyebrow">
              REAL-TIME MONITORING / ALERT CENTER
            </div>

            <h1>
              Active <span>Alerts.</span>
            </h1>

            <p>
              Stay ahead of disruptions affecting your supplier network.
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


        {/* ALERT SUMMARY */}

        <section className="alert-summary">

          <div className="alert-summary-card critical">
            <div className="alert-summary-icon">!</div>

            <div>
              <span>CRITICAL</span>
              <strong>01</strong>
              <small>Immediate action</small>
            </div>
          </div>


          <div className="alert-summary-card high">
            <div className="alert-summary-icon">↑</div>

            <div>
              <span>HIGH PRIORITY</span>
              <strong>02</strong>
              <small>Requires attention</small>
            </div>
          </div>


          <div className="alert-summary-card medium">
            <div className="alert-summary-icon">!</div>

            <div>
              <span>MEDIUM</span>
              <strong>01</strong>
              <small>Being monitored</small>
            </div>
          </div>


          <div className="alert-summary-card total">
            <div className="alert-summary-icon">◌</div>

            <div>
              <span>TOTAL ALERTS</span>
              <strong>05</strong>
              <small>Last 24 hours</small>
            </div>
          </div>

        </section>


        {/* ALERT LIST */}

        <section className="dashboard-panel alerts-panel">

          <div className="alerts-header">

            <div>
              <span>LIVE INTELLIGENCE</span>
              <h2>Recent Alerts</h2>
            </div>

            <button className="alert-filter">
              ALL ALERTS ▾
            </button>

          </div>


          <div className="alerts-list">

            {alerts.map((alert, index) => (

              <div
                className="alert-row"
                key={index}
              >

                <div className={`alert-indicator ${alert.severity.toLowerCase()}`}>
                  <span>
                    {alert.severity === 'CRITICAL'
                      ? '!'
                      : alert.severity === 'HIGH'
                      ? '↑'
                      : '•'}
                  </span>
                </div>


                <div className="alert-content">

                  <div className="alert-title-row">

                    <h3>
                      {alert.title}
                    </h3>

                    <span
                      className={`alert-severity ${alert.severity.toLowerCase()}`}
                    >
                      {alert.severity}
                    </span>

                  </div>

                  <p>
                    {alert.description}
                  </p>

                  <div className="alert-meta">

                    <span>
                      SUPPLIER: <strong>{alert.supplier}</strong>
                    </span>

                    <span>
                      LOCATION: <strong>{alert.location}</strong>
                    </span>

                    <span>
                      TYPE: <strong>{alert.type}</strong>
                    </span>

                  </div>

                </div>


                <div className="alert-time">

                  <span>
                    {alert.time}
                  </span>

                  <button>
                    VIEW DETAILS →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  )
}

export default Alerts