import './App.css'

function Recommendations({
  onBack,
  onSuppliers,
  onAlerts,
  onRiskAnalysis,
  onNetworkMap
}) {

  const recommendations = [
    {
      rank: '01',
      name: 'Apex Electronics',
      location: 'Bengaluru',
      category: 'Electronics',
      risk: 31,
      match: 94,
      saving: '₹8.4L',
      priority: 'HIGH',
      reason: 'Strong production capability with significantly lower disruption exposure.'
    },
    {
      rank: '02',
      name: 'TechNova Industries',
      location: 'Pune',
      category: 'Electronics',
      risk: 36,
      match: 89,
      saving: '₹6.7L',
      priority: 'MEDIUM',
      reason: 'Reliable delivery network and strong geographic compatibility.'
    },
    {
      rank: '03',
      name: 'Prime Components',
      location: 'Chennai',
      category: 'Electronics',
      risk: 42,
      match: 84,
      saving: '₹5.1L',
      priority: 'MEDIUM',
      reason: 'Good supplier fit with stable logistics performance.'
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

          <button
            className="sidebar-link"
            onClick={onNetworkMap}
          >
            <span>◉</span>
            Network Map
          </button>

          <button className="sidebar-link active">
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
              AI INTELLIGENCE / SUPPLIER OPTIMIZATION
            </div>

            <h1>
              Recommendations<span>.</span>
            </h1>

            <p>
              AI-ranked alternatives designed to reduce supplier disruption risk.
            </p>

          </div>


          <div className="dashboard-user">

            <div className="user-status">
              <span></span>
              AI ENGINE ONLINE
            </div>

            <div className="user-avatar">
              A
            </div>

          </div>

        </header>


        {/* RISK SOURCE */}

        <section className="recommendation-source">

          <div className="source-info">

            <span className="source-eyebrow">
              HIGH-RISK SUPPLIER
            </span>

            <h2>
              Global Components
            </h2>

            <p>
              Electronics · Mumbai
            </p>

          </div>


          <div className="source-risk">

            <span>CURRENT RISK</span>

            <strong>82</strong>

            <small>/ 100</small>

          </div>


          <div className="source-arrow">
            →
          </div>


          <div className="source-info">

            <span className="source-eyebrow">
              AI ACTION
            </span>

            <h2>
              Switch Supplier
            </h2>

            <p>
              3 suitable alternatives identified
            </p>

          </div>

        </section>


        {/* AI SUMMARY */}

        <section className="ai-recommendation-summary">

          <div className="ai-summary-icon">
            ✦
          </div>

          <div>

            <span>AI RECOMMENDATION</span>

            <h3>
              Reduce disruption exposure by up to <strong>41%</strong>
            </h3>

            <p>
              SupplierRadar identified alternative suppliers with
              lower risk, compatible capabilities and stronger
              network reliability.
            </p>

          </div>

        </section>


        {/* RECOMMENDATIONS HEADER */}

        <div className="recommendations-heading">

          <div>
            <span>RANKED ALTERNATIVES</span>
            <h2>Best Supplier Matches</h2>
          </div>

          <div className="recommendation-count">
            03 MATCHES
          </div>

        </div>


        {/* RECOMMENDATION CARDS */}

        <section className="recommendation-list">

          {recommendations.map((supplier) => (

            <div
              className="recommendation-card"
              key={supplier.rank}
            >

              <div className="recommendation-rank">
                {supplier.rank}
              </div>


              <div className="recommendation-main">

                <div className="recommendation-title">

                  <div>

                    <h3>
                      {supplier.name}
                    </h3>

                    <p>
                      {supplier.category} · {supplier.location}
                    </p>

                  </div>

                  <span className={`priority-badge ${supplier.priority.toLowerCase()}`}>
                    {supplier.priority}
                  </span>

                </div>


                <p className="recommendation-reason">
                  {supplier.reason}
                </p>


                <div className="recommendation-benefits">

                  <span>✓ Lower risk exposure</span>
                  <span>✓ Compatible capability</span>
                  <span>✓ Reliable logistics</span>

                </div>

              </div>


              <div className="recommendation-metrics">

                <div>
                  <span>RISK SCORE</span>
                  <strong>{supplier.risk}</strong>
                  <small>/100</small>
                </div>

                <div>
                  <span>MATCH</span>
                  <strong>{supplier.match}%</strong>
                </div>

                <div>
                  <span>EST. SAVING</span>
                  <strong>{supplier.saving}</strong>
                </div>

              </div>


              <button className="recommendation-button">
                VIEW SUPPLIER →
              </button>

            </div>

          ))}

        </section>


        {/* BOTTOM INSIGHTS */}

        <section className="recommendation-insights">

          <div className="dashboard-panel recommendation-insight">

            <span>RISK REDUCTION</span>

            <strong>−41%</strong>

            <p>
              Potential reduction in disruption exposure after
              switching to the top-ranked supplier.
            </p>

          </div>


          <div className="dashboard-panel recommendation-insight">

            <span>SUPPLIER MATCH QUALITY</span>

            <strong>94%</strong>

            <p>
              Highest compatibility score based on capability,
              location and reliability.
            </p>

          </div>


          <div className="dashboard-panel recommendation-insight">

            <span>ESTIMATED SAVINGS</span>

            <strong>₹8.4L</strong>

            <p>
              Estimated annual operational savings from the
              recommended supplier.
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Recommendations