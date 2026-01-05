import React from "react";
import "./Blog.css";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "What is Cryptocurrency?",
    date: "12 Jan 2025",
    category: "Beginner",
    excerpt:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates independently of a central bank.",
  },
  {
    title: "How to Get Started with Crypto",
    date: "13 Mar 2025",
    category: "Guide",
    excerpt:
      "Learn the basics of getting started with cryptocurrency, including how to choose a trusted exchange and create a secure wallet.",
  },
  {
    title: "Popular Cryptocurrencies in 2025",
    date: "14 Jun 2025",
    category: "Market",
    excerpt:
      "Explore the most popular cryptocurrencies such as Bitcoin, Ethereum, Solana, and Cardano, and what makes them unique.",
  },
  {
    title: "Crypto Safety Tips",
    date: "15 Aug 2025",
    category: "Security",
    excerpt:
      "Stay safe in the crypto world by learning essential security tips that help you protect your digital assets from scams.",
  },
  {
    title: "DeFi Explained",
    date: "22 Sep 2025",
    category: "Advanced",
    excerpt:
      "Decentralized Finance (DeFi) is a blockchain-based form of finance that does not rely on central financial intermediaries.",
  },
  {
    title: "The Future of NFTs",
    date: "05 Nov 2025",
    category: "Trends",
    excerpt:
      "Non-fungible tokens (NFTs) have taken the world by storm. Discover the potential future use cases beyond digital art.",
  }
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      <div className="glow-spot top-left"></div>

      <div className="blog-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Cosmic <span className="text-gradient-cyan">Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Navigate the blockchain universe with expert guides and news.
        </motion.p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, idx) => (
          <motion.div
            key={idx}
            className="blog-card glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onClick={() => navigate(`/blog/${idx}`)}
          >
            <div className="card-top">
              <span className="blog-category">{post.category}</span>
              <span className="blog-date">{post.date}</span>
            </div>

            <h3 className="blog-title-card">{post.title}</h3>
            <p className="blog-excerpt">{post.excerpt}</p>

            <div className="read-more">
              Read Article <span className="arrow">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
