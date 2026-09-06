import './App.css'

function Dashboard({ onLogout }) {
  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

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


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* HEADER */}

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


        {/* ================= KPI CARDS ================= */}

        <section className="dashboard-stats">

          <div className="stat-card risk-stat">

            <div className="stat-top">
              <span>OVERALL RISK SCORE</span>
              <b>↗</b>
            </div>

            <div className="stat-value">
              72
              <small>/100</small>
            </div>

            <div className="stat-status">
              <span></span>
              MODERATE RISK
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>ACTIVE SUPPLIERS</span>
              <b>◎</b>
            </div>

            <div className="stat-value">
              24
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
              03
            </div>

            <div className="stat-status warning">
              <span></span>
              REQUIRES ATTENTION
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>NETWORK HEALTH</span>
              <b>✓</b>
            </div>

            <div className="stat-value">
              98%
            </div>

            <div className="stat-status healthy">
              <span></span>
              NETWORK STABLE
            </div>

          </div>

        </section>


        {/* ================= CHART + DISTRIBUTION ================= */}

        <section className="dashboard-middle">


          {/* RISK TREND */}

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

                      <stop
                        offset="0%"
                        stopColor="#00e5c3"
                      />

                      <stop
                        offset="100%"
                        stopColor="#8b5cf6"
                      />

                    </linearGradient>

                  </defs>


                  <polyline
                    points="
                      0,170
                      80,145
                      160,155
                      240,105
                      320,125
                      400,75
                      480,92
                      600,48
                    "
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="4"
                  />


                  <circle
                    cx="600"
                    cy="48"
                    r="6"
                    fill="#00e5c3"
                  />

                </svg>


                <div className="chart-tooltip">
                  RISK SCORE
                  <strong>72</strong>
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


          {/* RISK DISTRIBUTION */}

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

                  <strong>24</strong>
                  <span>SUPPLIERS</span>

                </div>

              </div>

            </div>


            <div className="risk-legend">

              <div>
                <span className="legend-dot high"></span>
                <p>High Risk</p>
                <strong>04</strong>
              </div>

              <div>
                <span className="legend-dot medium"></span>
                <p>Medium Risk</p>
                <strong>08</strong>
              </div>

              <div>
                <span className="legend-dot low"></span>
                <p>Low Risk</p>
                <strong>12</strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= BOTTOM ================= */}

        <section className="dashboard-bottom">


          {/* ALERTS */}

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

              <div className="dashboard-alert high-alert">

                <div className="alert-symbol">
                  !
                </div>

                <div>
                  <strong>Supplier disruption detected</strong>
                  <p>Critical supplier requires attention</p>
                </div>

                <span className="alert-time">
                  12m
                </span>

              </div>


              <div className="dashboard-alert medium-alert">

                <div className="alert-symbol">
                  !
                </div>

                <div>
                  <strong>Weather risk identified</strong>
                  <p>Potential logistics disruption</p>
                </div>

                <span className="alert-time">
                  38m
                </span>

              </div>


              <div className="dashboard-alert normal-alert">

                <div className="alert-symbol">
                  ✓
                </div>

                <div>
                  <strong>Network health stable</strong>
                  <p>No critical infrastructure issues</p>
                </div>

                <span className="alert-time">
                  1h
                </span>

              </div>

            </div>

          </div>


          {/* TOP SUPPLIERS */}

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

              <div className="supplier-row">

                <div className="supplier-name">
                  <span>01</span>
                  <div>
                    <strong>Global Components</strong>
                    <small>Electronics</small>
                  </div>
                </div>

                <div className="supplier-score">
                  <span>82</span>
                  <small>RISK</small>
                </div>

              </div>


              <div className="supplier-row">

                <div className="supplier-name">
                  <span>02</span>
                  <div>
                    <strong>Nova Materials</strong>
                    <small>Raw Materials</small>
                  </div>
                </div>

                <div className="supplier-score medium-score">
                  <span>74</span>
                  <small>RISK</small>
                </div>

              </div>


              <div className="supplier-row">

                <div className="supplier-name">
                  <span>03</span>
                  <div>
                    <strong>Vertex Logistics</strong>
                    <small>Transportation</small>
                  </div>
                </div>

                <div className="supplier-score low-score">
                  <span>61</span>
                  <small>RISK</small>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Dashboard