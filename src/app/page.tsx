'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSnapScroll } from '../hooks/useSnapScroll'

const SimpleThreeJS = dynamic(() => import('../components/SimpleThreeJS'), {
  ssr: false,
  loading: () => <div>Loading 3D Experience...</div>
})

// Section details data
type SectionKey = 'CREATIVE STUDIO' | 'DESIGN EXCELLENCE' | 'VISUAL IDENTITY' | 'DIGITAL CRAFT' | 'BRAND EXPERIENCE' | 'ARTISTIC VISION' | 'MODERN AESTHETICS' | 'INNOVATIVE SOLUTIONS';

const sectionDetails: Record<SectionKey, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}> = {
  'CREATIVE STUDIO': {
    title: 'Creative Studio',
    subtitle: 'Where imagination meets innovation',
    description: 'We are a creative studio that transforms ideas into extraordinary digital experiences. Our team of designers, developers, and strategists work together to create meaningful connections between brands and their audiences.',
    features: ['Brand Identity Design', 'Web Development', 'Digital Marketing', 'UI/UX Design', 'Creative Direction'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop'
  },
  'DESIGN EXCELLENCE': {
    title: 'Design Excellence',
    subtitle: 'Crafting perfection in every pixel',
    description: 'Design excellence is not just about aesthetics—it\'s about creating solutions that are both beautiful and functional. We believe that great design should be intuitive, accessible, and emotionally engaging.',
    features: ['Research & Discovery', 'Concept Development', 'Prototyping & Testing', 'Visual Design', 'Implementation'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
  },
  'VISUAL IDENTITY': {
    title: 'Visual Identity',
    subtitle: 'Building memorable brand experiences',
    description: 'We create comprehensive visual identities that tell your brand\'s unique story. From logo design to complete brand guidelines, we ensure consistency across all touchpoints.',
    features: ['Logo Design & Branding', 'Brand Guidelines', 'Typography Systems', 'Color Palettes', 'Marketing Materials'],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop'
  },
  'DIGITAL CRAFT': {
    title: 'Digital Craft',
    subtitle: 'Mastering the art of digital creation',
    description: 'Digital craft combines traditional craftsmanship with modern technology. We create digital experiences that feel handmade, personal, and authentic.',
    features: ['Custom Development', 'Interactive Design', 'Animation & Motion', 'Digital Art', 'Web Applications'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop'
  },
  'BRAND EXPERIENCE': {
    title: 'Brand Experience',
    subtitle: 'Creating emotional connections',
    description: 'Brand experience is about creating meaningful interactions between your brand and customers. We design touchpoints that build trust, loyalty, and lasting relationships.',
    features: ['Customer Journey Mapping', 'Touchpoint Design', 'Experience Strategy', 'Brand Activation', 'Digital Experiences'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  },
  'ARTISTIC VISION': {
    title: 'Artistic Vision',
    subtitle: 'Bringing creative concepts to life',
    description: 'Artistic vision drives everything we do. We combine creativity with strategy to create visually stunning and conceptually strong work that resonates with audiences.',
    features: ['Creative Direction', 'Art Direction', 'Visual Storytelling', 'Concept Development', 'Creative Strategy'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop'
  },
  'MODERN AESTHETICS': {
    title: 'Modern Aesthetics',
    subtitle: 'Contemporary design for today\'s world',
    description: 'Modern aesthetics blend minimalism with functionality. We create clean, sophisticated designs that stand the test of time while remaining relevant and engaging.',
    features: ['Minimalist Design', 'Clean Typography', 'Modern Layouts', 'Contemporary Color', 'Sophisticated UI'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop'
  },
  'INNOVATIVE SOLUTIONS': {
    title: 'Innovative Solutions',
    subtitle: 'Pushing boundaries with technology',
    description: 'Innovation is at the heart of what we do. We leverage cutting-edge technology and creative thinking to solve complex problems and create breakthrough solutions.',
    features: ['Technology Integration', 'Creative Problem Solving', 'Future-Forward Design', 'Digital Innovation', 'Strategic Solutions'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop'
  }
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const { handleActiveChange } = useSnapScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Set initial styles
    if (mounted) {
      document.body.style.margin = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.fontFamily = '"Inter", "Helvetica Neue", Arial, sans-serif'
    }

    return () => {
      if (mounted) {
        document.body.style.overflow = 'auto'
        document.body.style.backgroundColor = ''
      }
    }
  }, [mounted])

  const handleSectionClick = (sectionName: string) => {
    console.log('handleSectionClick called with:', sectionName); // Debug log
    alert('Section click received: ' + sectionName); // Visual confirmation
    setSelectedSection(sectionName)
  }

  const handleCloseModal = () => {
    setSelectedSection(null)
  }

  if (!mounted) {
    return (
      <div style={{ 
        backgroundColor: '#e0c08d', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div 
            style={{
              width: '60px',
              height: '60px',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              borderTop: '3px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem'
            }}
          />
          <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
            Cubic 3D Experience
          </h1>
          <p style={{ opacity: 0.8 }}>Preparing experience...</p>
        </div>
      </div>
    )
  }

  return (
    <main style={{ 
      height: '100vh', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* 3D Snap Scroll Cubes - Full Screen */}
      <SimpleThreeJS 
        onActiveChange={handleActiveChange} 
        onSectionClick={handleSectionClick}
      />

      {/* Section Details Modal */}
      {selectedSection && sectionDetails[selectedSection as SectionKey] && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>×</button>
            
            <div className="modal-header">
              <img 
                src={sectionDetails[selectedSection as SectionKey].image} 
                alt={sectionDetails[selectedSection as SectionKey].title}
                className="modal-image"
              />
              <div className="modal-text">
                <h2>{sectionDetails[selectedSection as SectionKey].title}</h2>
                <p className="modal-subtitle">{sectionDetails[selectedSection as SectionKey].subtitle}</p>
              </div>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{sectionDetails[selectedSection as SectionKey].description}</p>
              
              <div className="features-section">
                <h3>What We Offer</h3>
                <ul className="features-list">
                  {sectionDetails[selectedSection as SectionKey].features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #666;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #000;
        }
        
        .modal-header {
          position: relative;
          margin-bottom: 2rem;
        }
        
        .modal-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 20px 20px 0 0;
        }
        
        .modal-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem;
          border-radius: 0 0 0 0;
        }
        
        .modal-text h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        
        .modal-subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 300;
        }
        
        .modal-body {
          padding: 0 2rem 2rem 2rem;
        }
        
        .modal-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 2rem;
        }
        
        .features-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .features-list li {
          background: rgba(0, 0, 0, 0.05);
          padding: 0.8rem 1.2rem;
          margin-bottom: 0.5rem;
          border-radius: 10px;
          border-left: 4px solid #007bff;
          font-weight: 500;
          color: #333;
          transition: all 0.3s ease;
        }
        
        .features-list li:hover {
          background: rgba(0, 123, 255, 0.1);
          transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 1rem;
          }
          
          .modal-content {
            max-height: 90vh;
          }
          
          .modal-image {
            height: 200px;
          }
          
          .modal-text {
            padding: 1.5rem;
          }
          
          .modal-text h2 {
            font-size: 2rem;
          }
          
          .modal-body {
            padding: 0 1.5rem 1.5rem 1.5rem;
          }
        }
      `}</style>
    </main>
  )
}