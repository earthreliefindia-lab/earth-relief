import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// 1. Custom Leaf Cursor Component
const LeafCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return <div ref={cursorRef} className="leaf-cursor">🌿</div>;
};

// 2. Skeleton Loader (Glossy Mirror effect)
const SkeletonLoader = () => (
  <div className="container" style={{maxWidth: '1100px', margin: '40px auto', padding: '0 20px'}}>
    <div className="skeleton" style={{height: '350px', marginBottom: '30px'}}></div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
      <div className="skeleton" style={{height: '250px'}}></div>
      <div className="skeleton" style={{height: '250px'}}></div>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');

  // Network speed simulation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <>
      <LeafCursor />
      <nav className="navbar">
        <div className="logo">Earth Relief</div>
        <div style={{display: 'flex', gap: '20px'}}>
          <button style={{background: 'none', border: 'none', color: page === 'home' ? '#1B5E20' : '#5f6368', fontWeight: 600, cursor: 'none'}} onClick={() => setPage('home')}>Home</button>
          <button style={{background: 'none', border: 'none', color: page === 'about' ? '#1B5E20' : '#5f6368', fontWeight: 600, cursor: 'none'}} onClick={() => setPage('about')}>About Us</button>
        </div>
      </nav>

      <main style={{minHeight: '80vh'}}>
        {loading ? <SkeletonLoader /> : (
          <div className="container" style={{maxWidth: '1100px', margin: '40px auto', padding: '0 20px'}}>
            {page === 'home' ? (
              <div className="fade-in">
                <div className="material-card">
                  <h1 style={{fontSize: '42px', marginBottom: '15px'}}>Plastic is becoming a <span style={{color: '#1B5E20'}}>weak choice.</span></h1>
                  <p style={{fontSize: '18px', color: '#5f6368'}}>Smart businesses are switching to better alternatives. Eco-friendly packaging that helps your business look better and work smarter[cite: 1490, 1491].</p>
                  <a href="https://wa.me/917838889588" target="_blank" className="btn-primary" style={{marginTop: '20px', display: 'inline-block'}}>WhatsApp Us</a>
                </div>
              </div>
            ) : (
              /* ABOUT US - CHOICE 1 FROM DOCX */
              <div className="fade-in">
                <div className="material-card">
                  <h1>We are not just replacing plastic. <br/><span style={{color: '#1B5E20'}}>We are helping businesses make smarter choices.</span> [cite: 1614]</h1>
                  <p style={{marginTop: '20px'}}>Earth Relief was created to give businesses a better alternative — one that improves brand image and supports sustainability[cite: 1615].</p>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
                   <div className="material-card">
                      <h3>The Problem</h3>
                      <p>Businesses were using plastic because it was easy, but it hurt their brand image[cite: 1619, 1620].</p>
                   </div>
                   <div className="material-card">
                      <h3>Our Vision</h3>
                      <p>Sustainability should not feel like a compromise; it should feel like an upgrade[cite: 1650].</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer>
        <div className="logo" style={{marginBottom: '20px'}}>Earth Relief</div>
        <p>Near Jogendra Market, Dadri, Greater Noida [cite: 1310]</p>
        <div className="social-links" style={{marginTop: '20px'}}>
          <a href="https://www.instagram.com/earthrelief.india" target="_blank">Instagram [cite: 1312]</a>
          <a href="https://wa.me/917838889588" target="_blank">WhatsApp [cite: 1317]</a>
          <a href="https://www.linkedin.com/in/earth-relief-8722213b0/" target="_blank">LinkedIn [cite: 1316]</a>
        </div>
      </footer>
    </>
  );
}
