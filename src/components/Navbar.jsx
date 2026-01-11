import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout, isEmailProvider } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [logout, navigate]);

  // Sidebar open/close functions
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar when clicking outside (on overlay) or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && event.target.classList.contains('sidebar-overlay')) {
        closeSidebar();
      }
    };

    const handleEscapeKey = (event) => {
      if (isSidebarOpen && event.key === 'Escape') {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSidebarOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Insights" },
    { to: "/features", label: "Features" },
    { to: "/contributors", label: "Contributors" },
  ];

  const authenticatedNavLinks = [
    ...navLinks,
    { to: "/dashboard", label: "Dashboard" },
    { to: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isDashboardPage ? "is-dashboard" : ""}`}>
        <div className="navbar-content">
          {/* Brand/Logo Section */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <img src="/crypto-logo.png" alt="CryptoHub" className="logo-img" />
            </div>
            <span className="logo-text">CryptoHub</span>
          </Link>

          {/* Desktop Navigation Menu */}
          {!isDashboardPage && (
            <ul className="navbar-menu">
              {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
                <li key={link.to} className="navbar-item">
                  <Link 
                    to={link.to} 
                    className={`navbar-link ${location.pathname === link.to ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Desktop Auth Buttons/User Menu */}
            <div className="desktop-auth">
              {currentUser ? (
                <div className="user-menu">
                  <span className="user-email">{currentUser.email}</span>
                  {isEmailProvider() && (
                    <Link to="/change-password" className="icon-btn" title="Change Password">
                      <FiLock />
                    </Link>
                  )}
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="navbar-btn navbar-btn-login">
                    LOGIN
                  </Link>
                  <Link to="/signup" className="navbar-btn navbar-btn-signup">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button 
              className={`navbar-toggle ${isSidebarOpen ? "active" : ""}`}
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar menu" : "Open sidebar menu"}
              aria-expanded={isSidebarOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} 
        onClick={closeSidebar}
        aria-hidden={!isSidebarOpen}
      ></div>
      
      {/* Sidebar Menu */}
      <div 
        className={`sidebar-menu ${isSidebarOpen ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={closeSidebar}>
            <div className="sidebar-logo-icon">
              <img src="/crypto-logo.png" alt="CryptoHub" className="logo-img" />
            </div>
            <span className="logo-text">CryptoHub</span>
          </Link>
          <button 
            className="sidebar-close-btn" 
            onClick={closeSidebar} 
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>
        
        <div className="sidebar-content">
          {currentUser && (
            <div className="sidebar-user">
              <div className="user-info">
                <div className="user-avatar">
                  {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-details">
                  <div className="user-email-sidebar">{currentUser.email}</div>
                  <span className="user-plan">Premium Plan</span>
                </div>
              </div>
              {isEmailProvider() && (
                <Link 
                  to="/change-password" 
                  className="sidebar-btn sidebar-btn-login" 
                  onClick={closeSidebar}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FiLock />
                  Change Password
                </Link>
              )}
            </div>
          )}
          
          <ul className="sidebar-nav">
            {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
              <li key={link.to} className="sidebar-nav-item">
                <Link 
                  to={link.to} 
                  className={`sidebar-nav-link ${location.pathname === link.to ? "active" : ""}`}
                  onClick={closeSidebar}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="sidebar-actions">
            {!currentUser ? (
              <div className="sidebar-auth">
                <Link to="/login" className="sidebar-btn sidebar-btn-login" onClick={closeSidebar}>
                  LOGIN
                </Link>
                <Link to="/signup" className="sidebar-btn sidebar-btn-signup" onClick={closeSidebar}>
                  Get Started
                </Link>
              </div>
            ) : (
              <button onClick={() => { handleLogout(); closeSidebar(); }} className="sidebar-btn sidebar-btn-login">
                Logout
              </button>
            )}
          </div>
          
          <div className="sidebar-footer">
            <p>© 2026 CryptoHub. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;