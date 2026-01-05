import React, { useState, useEffect, useCallback } from "react";
/* import { CoinContext } from "../context/CoinContext"; */
import { useAuth } from "../context/AuthContext";
/* import { useTheme } from "../context/ThemeContext"; */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoHomeOutline, IoPricetagsOutline, IoNewspaperOutline, IoRocketOutline, IoGridOutline, IoTrophyOutline, IoMenu, IoClose } from "react-icons/io5";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi"; // Added react-icons for cleaner UI
import "./Navbar.css";

function Navbar() {
  /* const { setCurrency } = useContext(CoinContext); */
  const { currentUser, logout } = useAuth();
  /* const { theme } = useTheme(); */
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDashboardPage = location.pathname === "/dashboard";

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 
  const currencies = [
    { label: "USD", value: "usd", symbol: "$" },
    { label: "EUR", value: "eur", symbol: "€" },
    { label: "INR", value: "inr", symbol: "₹" },
  ];
  */

  /*
  const currencyHandler = useCallback((currency) => {
    setCurrency({ name: currency.value, Symbol: currency.symbol });
  }, [setCurrency]);
  */

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [logout, navigate]);

  const navLinks = [
    { to: "/", label: "Home", icon: <IoHomeOutline /> },
    { to: "/pricing", label: "Pricing", icon: <IoPricetagsOutline /> },
    { to: "/blog", label: "Blog", icon: <IoNewspaperOutline /> },
    { to: "/features", label: "Features", icon: <IoRocketOutline /> },
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Insights" }, // Renamed for professionalism
    { to: "/features", label: "Features" },
  ];

  const authenticatedNavLinks = [
    ...navLinks,
    { to: "/dashboard", label: "Dashboard", icon: <IoGridOutline /> },
    { to: "/leaderboard", label: "Leaderboard", icon: <IoTrophyOutline /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo-wrapper">
            <img src="/crypto-logo.png" alt="CryptoHub" className="logo-img" />
          </div>
          <span className="logo-text">CryptoHub</span>
        </Link>
      </div>

      {!isDashboardPage && (
        <>
          {/* Desktop Menu */}
          <ul className="nav-links desktop-only">
            {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
              <li key={link.to} className={`nav-item ${location.pathname === link.to ? "active" : ""}`}>
                <Link to={link.to} className="nav-link">
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="nav-right">
        <div className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          <div className={`toggle-track ${isDark ? "dark" : "light"}`}>
            <div className="toggle-thumb"></div>
          </div>
        </div>

        <select
          className="currency-select"
          onChange={(e) => {
            const currency = currencies.find(c => c.value === e.target.value);
            currencyHandler(currency);
          }}
          value={selectedCurrency.value}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        <div className="desktop-auth">
          {currentUser ? (
            <>
              <div className="user-info">
                <span className="user-email">{currentUser.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="signup-btn">Sign up</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {!isDashboardPage && (currentUser ? authenticatedNavLinks : navLinks).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-nav-item ${location.pathname === link.to ? "active" : ""}`}
            >
              <span className="mobile-nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="mobile-controls">
          <div className="mobile-control-item" onClick={toggleTheme}>
            <span>Theme</span>
            <div className={`toggle-track ${isDark ? "dark" : "light"}`}>
              <div className="toggle-thumb"></div>
            </div>
          </div>

          <div className="mobile-control-item">
            <span>Currency</span>
            <select
              className="currency-select mobile"
              onChange={(e) => {
                const currency = currencies.find(c => c.value === e.target.value);
                currencyHandler(currency);
              }}
              value={selectedCurrency.value}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="inr">INR</option>
            </select>
          </div>
        </div>

        <div className="mobile-auth">
          {currentUser ? (
            <button onClick={handleLogout} className="logout-btn full-width">Logout</button>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="login-btn full-width">Login</button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="signup-btn full-width">Sign up</button>
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {!isDashboardPage && (
            <>
              {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={location.pathname === link.to ? "active" : ""}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="nav-right desktop-only">
          {/* Currency Selector Removed as per request */}

          {currentUser ? (
            <div className="user-menu">
              <span className="user-email">{currentUser.email}</span>
              <button onClick={handleLogout} className="icon-btn" title="Logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-glass-nav">Log In</Link>
              <Link to="/signup" className="btn-neon">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu glass-panel">
          <ul className="mobile-nav-links">
            {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={location.pathname === link.to ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            {!currentUser && (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                <Link to="/signup" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
              </>
            )}
            {currentUser && (
              <button onClick={handleLogout} className="btn-text">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;