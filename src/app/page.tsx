'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSnapScroll } from '../hooks/useSnapScroll'

const SimpleThreeJS = dynamic(() => import('../components/SimpleThreeJS'), {
  ssr: false,
  loading: () => <div>Loading 3D Experience...</div>
})

export default function Home() {
  const [mounted, setMounted] = useState(false)
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
      <SimpleThreeJS onActiveChange={handleActiveChange} />

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
      `}</style>
    </main>
  )
}