import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { plans, comparisonFeatures, faqs } from "../data/pricingPlans";
import 'Pricing.css';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

export default function Pricing() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handlePlanClick = (planName) => {
    if (planName === "Free") {
      navigate("/signup");
    } else {
      alert("💳 Payment Gateway Coming Soon!\n\nWe're working on integrating secure payment options. Stay tuned!");
    }
  };

  const containerBg = isDark
    ? 'bg-gradient-to-b from-[#0a0a1b] via-[#0f0f23] to-[#0a0a1b]'
    : 'bg-gradient-to-b from-gray-50 via-white to-gray-50';

  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = isDark ? 'text-gray-500' : 'text-gray-600';

  const cardBg = (popular) => popular
    ? isDark
      ? 'bg-gradient-to-b from-purple-900/20 to-gray-900/50 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 lg:scale-105'
      : 'bg-white border-2 border-purple-500 shadow-2xl lg:scale-105'
    : isDark
      ? 'bg-gray-900/50 border border-gray-800 hover:border-gray-700 shadow-xl'
      : 'bg-white border border-gray-200 hover:border-gray-300 shadow-lg';

  const buttonBg = (popular) => popular
    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30'
    : isDark
      ? 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white'
      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg';

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