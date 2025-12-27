'use client'

import React from 'react'

interface DesignExcellenceProps {
  onBack: () => void
}

const DesignExcellence: React.FC<DesignExcellenceProps> = ({ onBack }) => {
  return (
    <div className="section-page">
      <div className="section-content">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        
        <div className="section-header">
          <h1>Design Excellence</h1>
          <p className="section-subtitle">Crafting perfection in every pixel</p>
        </div>
        
        <div className="section-body">
          <div className="content-grid">
            <div className="content-card">
              <h3>Our Philosophy</h3>
              <p>Design excellence is not just about aesthetics—it's about creating solutions that are both beautiful and functional. We believe that great design should be intuitive, accessible, and emotionally engaging.</p>
            </div>
            
            <div className="content-card">
              <h3>Design Process</h3>
              <ul>
                <li>Research & Discovery</li>
                <li>Concept Development</li>
                <li>Prototyping & Testing</li>
                <li>Visual Design</li>
                <li>Implementation & Refinement</li>
              </ul>
            </div>
            
            <div className="content-card">
              <h3>Awards & Recognition</h3>
              <p>Our commitment to design excellence has been recognized by industry leaders. We've won multiple awards for our innovative approach to digital design and user experience.</p>
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
          background: linear-gradient(135deg, #8ea35d 0%, #7a8f4f 100%);
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

export default DesignExcellence