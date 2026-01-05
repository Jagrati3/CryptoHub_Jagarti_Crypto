import React from "react";
import "./Pricing.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

export default function Pricing() {
  const plans = [
    {
      name: "Explorer",
      price: "Free",
      period: "forever",
      description: "Essential tools for crypto beginners.",
      highlight: false,
      features: [
        { label: "Top 50 Coins Tracking", available: true },
        { label: "Real-time Prices", available: true },
        { label: "Basic Charts", available: true },
        { label: "Portfolio Tracker", available: false },
        { label: "Price Alerts", available: false },
        { label: "AI Insights", available: false },
      ],
    },
    {
      name: "Voyager",
      price: "₹399",
      period: "/month",
      description: "Advanced analytics for serious traders.",
      highlight: true,
      features: [
        { label: "Top 500 Coins Tracking", available: true },
        { label: "Advanced Charting", available: true },
        { label: "Portfolio Tracker", available: true },
        { label: "Price Alerts (5/day)", available: true },
        { label: "Ad-free Experience", available: true },
        { label: "AI Insights", available: false },
      ],
    },
    {
      name: "Galactic",
      price: "₹999",
      period: "/month",
      description: "Unlimited power for professionals.",
      highlight: false,
      features: [
        { label: "Unlimited Tracking", available: true },
        { label: "Pro Analytics Suite", available: true },
        { label: "Unlimited Portfolio", available: true },
        { label: "Unlimited Alerts", available: true },
        { label: "Ad-free Experience", available: true },
        { label: "AI Insights & Signals", available: true },
      ],
    },
  ];

  return (
    <div className="pricing-page">
      {/* Background Ambience */}
      <div className="glow-spot top-center"></div>

      <div className="pricing-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Unlock Your <span className="text-gradient-purple">Crypto Potential</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose the perfect trajectory for your investment journey.
        </motion.p>
      </div>

      <div className="pricing-cards-container">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`pricing-card glass-panel ${plan.highlight ? "highlighted" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            {plan.highlight && <div className="popular-tag">Most Popular</div>}

            <div className="card-header">
              <h3>{plan.name}</h3>
              <div className="price-wrapper">
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <p className="description">{plan.description}</p>
            </div>

            <div className="divider"></div>

            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i} className={feature.available ? "" : "unavailable"}>
                  {feature.available ? <FiCheck className="icon-check" /> : <FiX className="icon-x" />}
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>

            <button className={`btn-plan ${plan.highlight ? "btn-neon-purple" : "btn-glass"}`}>
              {plan.name === "Explorer" ? "Get Started" : "Upgrade Now"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}