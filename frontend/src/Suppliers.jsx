import './App.css'
function Suppliers({
  onBack,
  onAlerts,
  onRiskAnalysis,
  onNetworkMap,
  onRecommendations
}) {

  const suppliers = [
    {
      name: 'Global Components',
      category: 'Electronics',
      location: 'Mumbai, India',
      risk: 82,
      status: 'HIGH'
    },
    {
      name: 'Nova Materials',
      category: 'Raw Materials',
      location: 'Pune, India',
      risk: 74,
      status: 'HIGH'
    },
    {
      name: 'Vertex Logistics',
      category: 'Transportation',
      location: 'Delhi, India',
      risk: 61,
      status: 'MEDIUM'
    },
    {
      name: 'Apex Manufacturing',
      category: 'Manufacturing',
      location: 'Bengaluru, India',
      risk: 43,
      status: 'LOW'
    },
    {
      name: 'Prime Industrial',
      category: 'Components',
      location: 'Chennai, India',
      risk: 38,
      status: 'LOW'
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

          <button className="sidebar-link active">
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


      {/* MAIN */}

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>

            <div className="dashboard-eyebrow">
              SUPPLIER INTELLIGENCE / NETWORK
            </div>

            <h1>
              Supplier <span>Network.</span>
            </h1>

            <p>
              Monitor and analyze the health of your supplier network.
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


        {/* SUPPLIER SUMMARY */}

        <section className="supplier-summary">

          <div className="supplier-summary-card">

            <span>TOTAL SUPPLIERS</span>

            <strong>24</strong>

            <small>Actively monitored</small>

          </div>


          <div className="supplier-summary-card">

            <span>HIGH RISK</span>

            <strong className="purple-number">04</strong>

            <small>Requires attention</small>

          </div>


          <div className="supplier-summary-card">

            <span>MEDIUM RISK</span>

            <strong className="yellow-number">08</strong>

            <small>Being monitored</small>

          </div>


          <div className="supplier-summary-card">

            <span>LOW RISK</span>

            <strong className="green-number">12</strong>

            <small>Network stable</small>

          </div>

        </section>


        {/* SUPPLIER TABLE */}

        <section className="dashboard-panel supplier-table-panel">

          <div className="supplier-table-header">

            <div>

              <span>SUPPLIER DIRECTORY</span>

              <h2>All Suppliers</h2>

            </div>


            <div className="supplier-actions">

              <input
                type="text"
                placeholder="Search suppliers..."
              />

              <button>
                ALL RISK ▾
              </button>

            </div>

          </div>


          <div className="supplier-table">

            <div className="supplier-table-head">

              <span>SUPPLIER</span>
              <span>CATEGORY</span>
              <span>LOCATION</span>
              <span>RISK SCORE</span>
              <span>STATUS</span>

            </div>


            {suppliers.map((supplier, index) => (

              <div
                className="supplier-table-row"
                key={index}
              >

                <div className="supplier-table-name">

                  <div className="supplier-avatar">
                    {supplier.name.charAt(0)}
                  </div>

                  <div>

                    <strong>
                      {supplier.name}
                    </strong>

                    <small>
                      SUP-{String(index + 1).padStart(3, '0')}
                    </small>

                  </div>

                </div>


                <span className="supplier-category">
                  {supplier.category}
                </span>


                <span className="supplier-location">
                  {supplier.location}
                </span>


                <div className="table-risk-score">

                  <strong>
                    {supplier.risk}
                  </strong>

                  <div className="risk-bar">

                    <span
                      style={{
                        width: `${supplier.risk}%`
                      }}
                    ></span>

                  </div>

                </div>


                <span
                  className={`risk-badge ${supplier.status.toLowerCase()}`}
                >
                  {supplier.status}
                </span>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  )
}

export default Suppliers