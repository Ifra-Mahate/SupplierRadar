import './App.css'
function RiskAnalysis({
  onBack,
  onSuppliers,
  onAlerts,
  onNetworkMap,
  onRecommendations
}) {

  const suppliers = [
    {
      name: 'Global Components',
      score: 82,
      probability: '78%',
      level: 'HIGH'
    },
    {
      name: 'Nova Materials',
      score: 74,
      probability: '64%',
      level: 'HIGH'
    },
    {
      name: 'Vertex Logistics',
      score: 61,
      probability: '48%',
      level: 'MEDIUM'
    },
    {
      name: 'Apex Manufacturing',
      score: 43,
      probability: '21%',
      level: 'LOW'
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

          <button className="sidebar-link active">
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
              AI INTELLIGENCE / RISK ENGINE
            </div>

            <h1>
              Risk <span>Analysis.</span>
            </h1>

            <p>
              Predict and understand potential disruptions across your supplier network.
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


        {/* TOP RISK CARDS */}

        <section className="risk-overview">

          <div className="risk-main-card">

            <div className="risk-main-header">

              <div>
                <span>NETWORK RISK SCORE</span>
                <h2>72<span>/100</span></h2>
              </div>

              <div className="risk-ring">
                <div>
                  <strong>72</strong>
                  <small>RISK</small>
                </div>
              </div>

            </div>

            <div className="risk-main-status">
              <span></span>
              ELEVATED NETWORK RISK
            </div>

            <p>
              Multiple risk signals detected across your supplier network.
              Immediate monitoring is recommended for high-risk suppliers.
            </p>

          </div>


          <div className="risk-stat-card">

            <span>30-DAY DISRUPTION</span>

            <strong>64%</strong>

            <div className="risk-progress">
              <span></span>
            </div>

            <small>
              Predicted probability
            </small>

          </div>


          <div className="risk-stat-card">

            <span>HIGH-RISK SUPPLIERS</span>

            <strong className="purple-number">
              04
            </strong>

            <div className="risk-mini-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <small>
              Requires attention
            </small>

          </div>

        </section>


        {/* RISK FACTORS */}

        <section className="risk-content-grid">

          <div className="dashboard-panel risk-factors-panel">

            <div className="risk-panel-header">

              <div>
                <span>AI SIGNAL ANALYSIS</span>
                <h2>Risk Factors</h2>
              </div>

              <span className="analysis-status">
                LIVE
              </span>

            </div>


            <div className="risk-factor">

              <div className="factor-info">
                <div className="factor-icon">◉</div>

                <div>
                  <strong>Weather Risk</strong>
                  <small>Extreme weather signals</small>
                </div>
              </div>

              <div className="factor-value">
                <strong>82%</strong>
                <div>
                  <span style={{ width: '82%' }}></span>
                </div>
              </div>

            </div>


            <div className="risk-factor">

              <div className="factor-info">
                <div className="factor-icon">◈</div>

                <div>
                  <strong>Logistics Risk</strong>
                  <small>Port & transportation signals</small>
                </div>
              </div>

              <div className="factor-value">
                <strong>68%</strong>
                <div>
                  <span style={{ width: '68%' }}></span>
                </div>
              </div>

            </div>


            <div className="risk-factor">

              <div className="factor-info">
                <div className="factor-icon">◌</div>

                <div>
                  <strong>Market Risk</strong>
                  <small>Market volatility signals</small>
                </div>
              </div>

              <div className="factor-value">
                <strong>54%</strong>
                <div>
                  <span style={{ width: '54%' }}></span>
                </div>
              </div>

            </div>


            <div className="risk-factor">

              <div className="factor-info">
                <div className="factor-icon">⚠</div>

                <div>
                  <strong>Geopolitical Risk</strong>
                  <small>Trade & regional signals</small>
                </div>
              </div>

              <div className="factor-value">
                <strong>41%</strong>
                <div>
                  <span style={{ width: '41%' }}></span>
                </div>
              </div>

            </div>

          </div>


          {/* AI ASSESSMENT */}

          <div className="dashboard-panel ai-assessment">

            <div className="risk-panel-header">

              <div>
                <span>MODEL OUTPUT</span>
                <h2>AI Assessment</h2>
              </div>

              <div className="ai-pulse">
                <span></span>
              </div>

            </div>


            <div className="ai-score">

              <span>CONFIDENCE</span>

              <strong>
                91%
              </strong>

              <small>
                Prediction confidence
              </small>

            </div>


            <div className="ai-message">

              <div className="ai-message-icon">
                ✦
              </div>

              <div>

                <strong>
                  Elevated disruption risk detected
                </strong>

                <p>
                  Current signals indicate a higher probability of
                  supplier disruption within the next 30 days.
                </p>

              </div>

            </div>


            <button className="ai-action">
              VIEW DETAILED ANALYSIS →
            </button>

          </div>

        </section>


        {/* SUPPLIER RISK RANKING */}

        <section className="dashboard-panel supplier-risk-panel">

          <div className="risk-panel-header">

            <div>
              <span>SUPPLIER INTELLIGENCE</span>
              <h2>Supplier Risk Ranking</h2>
            </div>

            <span className="analysis-status">
              30 DAY FORECAST
            </span>

          </div>


          <div className="supplier-risk-table">

            <div className="supplier-risk-head">
              <span>SUPPLIER</span>
              <span>RISK SCORE</span>
              <span>DISRUPTION PROBABILITY</span>
              <span>LEVEL</span>
            </div>


            {suppliers.map((supplier, index) => (

              <div
                className="supplier-risk-row"
                key={index}
              >

                <strong>
                  {supplier.name}
                </strong>


                <div className="risk-ranking-score">

                  <strong>
                    {supplier.score}
                  </strong>

                  <div className="ranking-bar">
                    <span
                      style={{
                        width: `${supplier.score}%`
                      }}
                    ></span>
                  </div>

                </div>


                <span className="probability">
                  {supplier.probability}
                </span>


                <span
                  className={`risk-badge ${supplier.level.toLowerCase()}`}
                >
                  {supplier.level}
                </span>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  )
}

export default RiskAnalysis