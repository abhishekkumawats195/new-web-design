'use client'

import React from 'react'

interface CreativeStudioProps {
  onBack: () => void
}

const CreativeStudio: React.FC<CreativeStudioProps> = ({ onBack }) => {
  return (
    <div className="section-page">
      <div className="section-content">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        
        <div className="section-header">
          <h1>Creative Studio</h1>
          <p className="section-subtitle">Where imagination meets innovation</p>
        </div>
        
        <div className="section-body">
          <div className="content-grid">
            <div className="content-card">
              <h3>Our Vision</h3>
              <p>We are a creative studio that transforms ideas into extraordinary digital experiences. Our team of designers, developers, and strategists work together to create meaningful connections between brands and their audiences.</p>
            </div>
            
            <div className="content-card">
              <h3>What We Do</h3>
              <ul>
                <li>Brand Identity Design</li>
                <li>Web Development</li>
                <li>Digital Marketing</li>
                <li>UI/UX Design</li>
                <li>Creative Direction</li>
              </ul>
            </div>
            
            <div className="content-card">
              <h3>Our Approach</h3>
              <p>We believe in the power of storytelling through design. Every project begins with understanding your unique story and translating it into compelling visual narratives that resonate with your audience.</p>
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
          background: linear-gradient(135deg, #e0c08d 0%, #d4b078 100%);
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

export default CreativeStudio