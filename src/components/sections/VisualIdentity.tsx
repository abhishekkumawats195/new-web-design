'use client'

import React from 'react'

interface VisualIdentityProps {
  onBack: () => void
}

const VisualIdentity: React.FC<VisualIdentityProps> = ({ onBack }) => {
  return (
    <div className="section-page">
      <div className="section-content">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        
        <div className="section-header">
          <h1>Visual Identity</h1>
          <p className="section-subtitle">Building memorable brand experiences</p>
        </div>
        
        <div className="section-body">
          <div className="content-grid">
            <div className="content-card">
              <h3>Brand Strategy</h3>
              <p>We create comprehensive visual identities that tell your brand's unique story. From logo design to complete brand guidelines, we ensure consistency across all touchpoints.</p>
            </div>
            
            <div className="content-card">
              <h3>Services</h3>
              <ul>
                <li>Logo Design & Branding</li>
                <li>Brand Guidelines</li>
                <li>Typography Systems</li>
                <li>Color Palettes</li>
                <li>Marketing Materials</li>
              </ul>
            </div>
            
            <div className="content-card">
              <h3>Impact</h3>
              <p>A strong visual identity increases brand recognition by up to 80%. We help businesses create lasting impressions that drive customer loyalty and business growth.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .section-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #d16a5e 0%, #c55a4e 100%);
          z-index: 1000;
          overflow-y: auto;
          padding: 2rem;
        }
        
        .back-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }
        
        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }
        
        .section-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-header h1 {
          font-size: 4rem;
          font-weight: 900;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .section-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .content-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          color: white;
        }
        
        .content-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }
        
        .content-card p {
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .content-card ul {
          list-style: none;
          padding: 0;
        }
        
        .content-card li {
          padding: 0.5rem 0;
          color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
          .section-page {
            padding: 1rem;
          }
          
          .section-header h1 {
            font-size: 2.5rem;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default VisualIdentity