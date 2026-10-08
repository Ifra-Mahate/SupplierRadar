import './App.css'

function NetworkMap({
  onBack,
  onSuppliers,
  onAlerts,
  onRiskAnalysis,
  onRecommendations
}) {

  const suppliers = [
    {
      name: 'Global Components',
      location: 'Mumbai',
      risk: 82,
      level: 'HIGH',
      x: '22%',
      y: '25%'
    },
    {
      name: 'Nova Materials',
      location: 'Pune',
      risk: 74,
      level: 'HIGH',
      x: '72%',
      y: '23%'
    },
    {
      name: 'Vertex Logistics',
      location: 'Delhi',
      risk: 61,
      level: 'MEDIUM',
      x: '78%',
      y: '68%'
    },
    {
      name: 'Apex Manufacturing',
      location: 'Bengaluru',
      risk: 43,
      level: 'LOW',
      x: '23%',
      y: '72%'
    },
    {
      name: 'Prime Industrial',
      location: 'Chennai',
      risk: 38,
      level: 'LOW',
      x: '50%',
      y: '82%'
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

          <button
            className="sidebar-link"
            onClick={onAlerts}
          >
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

          <button className="sidebar-link active">
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
              SUPPLY CHAIN INTELLIGENCE / NETWORK
            </div>

            <h1>
              Network <span>Map.</span>
            </h1>

            <p>
              Visualize supplier connections and identify network-level risk.
            </p>

          </div>


          <div className="dashboard-user">

            <div className="user-status">
              <span></span>
              NETWORK ONLINE
            </div>

            <div className="user-avatar">
              A
            </div>

          </div>

        </header>


        {/* NETWORK SUMMARY */}

        <section className="network-summary">

          <div className="network-stat">
            <span>NETWORK HEALTH</span>
            <strong>82%</strong>
            <small>Overall network stability</small>
          </div>

          <div className="network-stat">
            <span>CONNECTED SUPPLIERS</span>
            <strong>24</strong>
            <small>Active relationships</small>
          </div>

          <div className="network-stat">
            <span>HIGH-RISK NODES</span>
            <strong className="purple-number">04</strong>
            <small>Requires monitoring</small>
          </div>

          <div className="network-stat">
            <span>ACTIVE DISRUPTIONS</span>
            <strong className="yellow-number">03</strong>
            <small>Detected signals</small>
          </div>

        </section>


        {/* NETWORK VISUAL */}

        <section className="dashboard-panel network-panel">

          <div className="network-panel-header">

            <div>
              <span>LIVE NETWORK VISUALIZATION</span>
              <h2>Supplier Dependency Network</h2>
            </div>

            <div className="network-legend">

              <span>
                <i className="legend-high"></i>
                HIGH
              </span>

              <span>
                <i className="legend-medium"></i>
                MEDIUM
              </span>

              <span>
                <i className="legend-low"></i>
                LOW
              </span>

            </div>

          </div>


          <div className="network-map">

            {/* CONNECTIONS */}

            <div className="network-line line-1"></div>
            <div className="network-line line-2"></div>
            <div className="network-line line-3"></div>
            <div className="network-line line-4"></div>
            <div className="network-line line-5"></div>


            {/* CENTRAL NODE */}

            <div className="central-node">

              <div className="central-pulse"></div>

              <div className="central-core">
                SR
              </div>

              <strong>YOUR COMPANY</strong>
              <small>PROCUREMENT HUB</small>

            </div>


            {/* SUPPLIER NODES */}

            {suppliers.map((supplier, index) => (

              <div
                className={`network-node ${supplier.level.toLowerCase()}`}
                key={index}
                style={{
                  left: supplier.x,
                  top: supplier.y
                }}
              >

                <div className="node-ring">

                  <div className="node-core">
                    {supplier.name.charAt(0)}
                  </div>

                </div>

                <div className="node-label">

                  <strong>
                    {supplier.name}
                  </strong>

                  <small>
                    {supplier.location} · RISK {supplier.risk}
                  </small>

                </div>

              </div>

            ))}


            <div className="map-grid"></div>

          </div>

        </section>


        {/* NETWORK INSIGHTS */}

        <section className="network-insights">

          <div className="dashboard-panel network-insight-card">

            <span>NETWORK CONCENTRATION</span>

            <strong>LOW</strong>

            <p>
              Supplier dependency is distributed across multiple
              locations, reducing single-point failure risk.
            </p>

          </div>


          <div className="dashboard-panel network-insight-card">

            <span>PRIMARY RISK NODE</span>

            <strong className="purple-text">
              Global Components
            </strong>

            <p>
              Highest current risk score with multiple active
              disruption signals.
            </p>

          </div>


          <div className="dashboard-panel network-insight-card">

            <span>NETWORK STATUS</span>

            <strong className="teal-text">
              STABLE
            </strong>

            <p>
              No critical network-wide disruption detected.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default NetworkMap