import { useState } from 'react'
import './App.css'
import Dashboard from './dashboard'
import Suppliers from './Suppliers'
import Alerts from './Alerts'
import RiskAnalysis from './RiskAnalysis'
import NetworkMap from './NetworkMap'
import Recommendations from './Recommendations'

function App() {

  const [showLogin, setShowLogin] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showSuppliers, setShowSuppliers] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showRiskAnalysis, setShowRiskAnalysis] = useState(false)
  const [showNetworkMap, setShowNetworkMap] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)


if (showSuppliers) {
  return (
    <Suppliers
      onBack={() => {
        setShowSuppliers(false)
        setShowDashboard(true)
      }}
      onAlerts={() => {
        setShowSuppliers(false)
        setShowAlerts(true)
      }}
      onNetworkMap={() => {
  setShowSuppliers(false)
  setShowNetworkMap(true)
}}
onRecommendations={() => {
  setShowSuppliers(false)
  setShowRecommendations(true)
}}
    />
  )
}
if (showAlerts) {
  return (
    <Alerts
      onBack={() => {
        setShowAlerts(false)
        setShowDashboard(true)
      }}
      onSuppliers={() => {
        setShowAlerts(false)
        setShowSuppliers(true)
      }}
      onRiskAnalysis={() => {
  setShowAlerts(false)
  setShowRiskAnalysis(true)
}}
onNetworkMap={() => {
  setShowAlerts(false)
  setShowNetworkMap(true)
}}
onRecommendations={() => {
  setShowAlerts(false)
  setShowRecommendations(true)
}}
    />
  )
}
if (showRiskAnalysis) {
  return (
    <RiskAnalysis
      onBack={() => {
        setShowRiskAnalysis(false)
        setShowDashboard(true)
      }}
      onSuppliers={() => {
        setShowRiskAnalysis(false)
        setShowSuppliers(true)
      }}
      onAlerts={() => {
        setShowRiskAnalysis(false)
        setShowAlerts(true)
      }}
      onRiskAnalysis={() => {
  setShowSuppliers(false)
  setShowRiskAnalysis(true)
}}
onNetworkMap={() => {
  setShowRiskAnalysis(false)
  setShowNetworkMap(true)
}}
onRecommendations={() => {
  setShowRiskAnalysis(false)
  setShowRecommendations(true)
}}
    />
  )
}
if (showNetworkMap) {
  return (
    <NetworkMap
      onBack={() => {
        setShowNetworkMap(false)
        setShowDashboard(true)
      }}
      onSuppliers={() => {
        setShowNetworkMap(false)
        setShowSuppliers(true)
      }}
      onAlerts={() => {
        setShowNetworkMap(false)
        setShowAlerts(true)
      }}
      onRiskAnalysis={() => {
        setShowNetworkMap(false)
        setShowRiskAnalysis(true)
      }}
      onRecommendations={() => {
  setShowNetworkMap(false)
  setShowRecommendations(true)
}}
    />
  )
}
if (showRecommendations) {
  return (
    <Recommendations
      onBack={() => {
        setShowRecommendations(false)
        setShowDashboard(true)
      }}
      onSuppliers={() => {
        setShowRecommendations(false)
        setShowSuppliers(true)
      }}
      onAlerts={() => {
        setShowRecommendations(false)
        setShowAlerts(true)
      }}
      onRiskAnalysis={() => {
        setShowRecommendations(false)
        setShowRiskAnalysis(true)
      }}
      onNetworkMap={() => {
        setShowRecommendations(false)
        setShowNetworkMap(true)
      }}
    />
  )
}
  if (showDashboard) {
  return (
  <Dashboard
  onLogout={() => {
    setShowDashboard(false)
    setShowLogin(false)
  }}
  onSuppliers={() => {
    setShowDashboard(false)
    setShowSuppliers(true)
  }}
 onAlerts={() => {
  setShowDashboard(false)
  setShowAlerts(true)
}}
onRiskAnalysis={() => {
  setShowDashboard(false)
  setShowRiskAnalysis(true)
}}
onNetworkMap={() => {
  setShowDashboard(false)
  setShowNetworkMap(true)
}}
onRecommendations={() => {
  setShowDashboard(false)
  setShowRecommendations(true)
}}
/>
  )
}

  if (showLogin) {
    return (
      <div className="login-page">

        {/* Background */}
        <div className="login-grid"></div>
        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>


        {/* TOP BRAND */}
        <div className="login-brand">

          <div className="brand-icon">
            <span></span>
          </div>

          <span>
            Supplier<span>Radar</span>
          </span>

        </div>


        {/* MAIN LOGIN AREA */}
        <div className="login-container">


          {/* LEFT SIDE */}
          <div className="login-info">

            <div className="login-eyebrow">
              <span></span>
              SECURE ACCESS
            </div>

            <h1>
              KNOW THE RISK.
              <br />
              <span>MOVE FIRST.</span>
            </h1>

            <p>
              Access your supplier intelligence dashboard
              and stay ahead of potential disruptions.
            </p>


            {/* Mini Radar */}
            <div className="mini-radar">

              <div className="mini-ring mini-ring-one"></div>
              <div className="mini-ring mini-ring-two"></div>
              <div className="mini-ring mini-ring-three"></div>

              <div className="mini-line"></div>

              <div className="mini-center"></div>

              <div className="mini-dot mini-dot-one"></div>
              <div className="mini-dot mini-dot-two"></div>
              <div className="mini-dot mini-dot-three"></div>

            </div>


            <div className="login-status">

              <span className="status-dot"></span>

              SUPPLIER INTELLIGENCE PLATFORM
              
            </div>

          </div>


          {/* RIGHT SIDE - LOGIN CARD */}
          <div className="login-card">

            <div className="card-top">

              <div>
                <span className="card-label">
                  SUPPLIERRADAR
                </span>

                <h2>
                  Welcome back.
                </h2>
              </div>

              <div className="secure-icon">
                ◉
              </div>

            </div>


            <p className="login-subtitle">
              Sign in to continue to your dashboard.
            </p>


            {/* EMAIL */}
            <div className="input-group">

              <label>
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="you@example.com"
              />

            </div>


            {/* PASSWORD */}
            <div className="input-group">

              <div className="password-label">

                <label>
                  PASSWORD
                </label>

                <a href="#">
                  Forgot password?
                </a>

              </div>

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>


            {/* LOGIN */}
            <button
  className="login-submit"
  onClick={() => setShowDashboard(true)}
>
              <span>LOGIN TO PLATFORM</span>
              <b>→</b>
            </button>


            {/* DIVIDER */}
            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>


            {/* SIGN UP */}
            <p className="signup-text">
              Don't have an account?
              <a href="#">
                Create account
              </a>
            </p>


            {/* SECURITY */}
            <div className="security-note">

              <span>✓</span>

              Your connection is secured
              with encrypted access.

            </div>

          </div>

        </div>


        {/* BACK BUTTON */}
        <button
          className="back-home"
          onClick={() => setShowLogin(false)}
        >
          ← BACK TO HOME
        </button>


        {/* FOOTER */}
        <div className="login-footer">
          SUPPLIERRADAR © 2026
        </div>

      </div>
    )
  }


  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="brand">

          <div className="brand-icon">
            <span></span>
          </div>

          <span className="brand-text">
            Supplier<span>Radar</span>
          </span>

        </div>


        <div className="nav-links">

          <a href="#platform">
            Platform
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        </div>

      </nav>


      {/* HERO */}
      <main className="hero" id="platform">

        <div className="hero-grid"></div>

        <div className="glow glow-left"></div>

        <div className="glow glow-right"></div>


        <div className="hero-content">

          {/* LEFT */}

          <section className="hero-copy">

            <div className="eyebrow">

              <span></span>

              AI-POWERED SUPPLIER INTELLIGENCE

              <i></i>

            </div>


            <h1 className="hero-title">

              <span className="title-white">
                SUPPLIER
              </span>

              <span className="title-outline">
                RADAR
              </span>

            </h1>


            <div className="hero-message">

              <div>
                SEE THE RISK.
              </div>

              <strong>
                BEFORE IT HITS.
              </strong>

            </div>


            <p className="hero-description">

              Monitor your suppliers, detect disruptions
              and make smarter, faster decisions.

            </p>


            <button className="explore-btn">

              <span>
                EXPLORE PLATFORM
              </span>

              <b>
                →
              </b>

            </button>

          </section>


          {/* RIGHT */}

          <section className="radar-section">

            <div className="radar-orbit orbit-one"></div>

            <div className="radar-orbit orbit-two"></div>


            <div className="radar-main">

              <div className="radar-ring ring-1"></div>
              <div className="radar-ring ring-2"></div>
              <div className="radar-ring ring-3"></div>
              <div className="radar-ring ring-4"></div>

              <div className="radar-cross horizontal"></div>
              <div className="radar-cross vertical"></div>


              <div className="globe">

                <div className="globe-latitude lat-1"></div>
                <div className="globe-latitude lat-2"></div>
                <div className="globe-latitude lat-3"></div>

                <div className="globe-longitude long-1"></div>
                <div className="globe-longitude long-2"></div>
                <div className="globe-longitude long-3"></div>

                <div className="globe-line globe-line-1"></div>
                <div className="globe-line globe-line-2"></div>
                <div className="globe-line globe-line-3"></div>

              </div>


              <div className="scan-beam"></div>

              <div className="radar-center">
                <span></span>
              </div>


              <div className="supplier-point point-one"></div>
              <div className="supplier-point point-two"></div>
              <div className="supplier-point point-three"></div>
              <div className="supplier-point point-four"></div>

            </div>


            {/* DATA CARDS */}

            <div className="data-card suppliers-card">

              <div className="card-icon supplier-icon">
                ♙
              </div>

              <div>
                <small>SUPPLIERS</small>
                <strong>24+</strong>
              </div>

            </div>


            <div className="data-card alerts-card">

              <div className="card-icon alert-icon">
                !
              </div>

              <div>
                <small>ALERTS</small>
                <strong>03</strong>
              </div>

            </div>


            <div className="data-card health-card">

              <div className="card-icon health-icon">
                ✓
              </div>

              <div>
                <small>NETWORK HEALTH</small>
                <strong>98%</strong>
              </div>

            </div>


            <div className="data-card regions-card">

              <div className="card-icon region-icon">
                ◎
              </div>

              <div>
                <small>REGIONS</small>
                <strong>07</strong>
              </div>

            </div>

          </section>

        </div>

      </main>


      {/* FEATURES */}

      <section
        className="feature-strip"
        id="features"
      >

        <div className="feature">

          <div className="feature-icon">
            ◉
          </div>

          <div>

            <span>
              MONITOR
            </span>

            <p>
              Track supplier health
              <br />
              in real time.
            </p>

          </div>

        </div>


        <div className="feature">

          <div className="feature-icon purple">
            ✦
          </div>

          <div>

            <span>
              PREDICT
            </span>

            <p>
              Identify risks before
              <br />
              they escalate.
            </p>

          </div>

        </div>


        <div className="feature">

          <div className="feature-icon">
            ✓
          </div>

          <div>

            <span>
              PROTECT
            </span>

            <p>
              Make faster, smarter
              <br />
              decisions.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-label">
          WHY SUPPLIERRADAR?
        </div>

        <h2>

          KNOW THE RISK.
          <br />

          <span>
            MOVE FIRST.
          </span>

        </h2>

        <p>

          SupplierRadar combines supplier intelligence,
          risk analysis and real-time information into
          one intelligent platform.

        </p>

      </section>

    </div>
  )
}

export default App