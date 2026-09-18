import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../components/common/Button';

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    // Try to play on mount
    tryPlay();

    // Retry when page becomes visible again (tab switch)
    const handleVisibility = () => {
      if (!document.hidden && video.paused) tryPlay();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Retry on any user interaction (covers autoplay policy)
    const handleInteraction = () => {
      if (video.paused) tryPlay();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
      {/* Hero Section — Full-screen video */}
      <section className="hero-section">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          onCanPlay={() => { if (videoRef.current) videoRef.current.play(); }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />
        <div className="hero-vignette" />

        <div className="hero-content">
          <div className="hero-badge">
            ✦ Autumn / Winter 2026 Collection
          </div>

          <h1 className="hero-title">
            Redefine Your <span className="gradient-text">Style</span>
          </h1>

          <p className="hero-description">
            Discover our premium collection of tailored luxury shirts for the modern gentleman.
            Italian fabrics & precision craftsmanship.
          </p>

          <div className="hero-buttons">
            <Link to="/collections">
              <Button size="lg" className="hero-btn-primary">
                Shop Collection <FiArrowRight style={{ marginLeft: '8px' }} />
              </Button>
            </Link>
            <Link to="/collections?filter=new">
              <button className="hero-btn-secondary">
                New Arrivals
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <style>{`
        .hero-section {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: -80px;
        }
        .hero-video {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover; z-index: 0;
          filter: brightness(0.45) contrast(1.15) saturate(0.9);
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.15) 40%, rgba(5,5,5,0.6) 80%, rgba(5,5,5,0.95) 100%);
          z-index: 1;
        }
        .hero-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.7) 100%);
          z-index: 1;
        }
        .hero-content {
          text-align: center; z-index: 2;
          padding: 0 20px; max-width: 900px;
        }
        .hero-badge {
          display: inline-block; padding: 8px 24px;
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.25);
          border-radius: var(--radius-full); color: var(--accent-gold);
          font-size: 0.78rem; font-weight: 600; letter-spacing: 3px;
          text-transform: uppercase; margin-bottom: 28px; backdrop-filter: blur(8px);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 6vw, 5rem);
          font-weight: 700; letter-spacing: 2px;
          margin-bottom: 24px; line-height: 1.1;
          color: #f0ece4; text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .hero-description {
          font-size: 1.15rem; color: rgba(240,236,228,0.75);
          letter-spacing: 0.5px; line-height: 1.7;
          max-width: 650px; margin: 0 auto 44px; font-weight: 300;
        }
        .hero-buttons {
          display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
        }
        .hero-btn-primary {
          min-width: 200px; font-size: 1rem; padding: 16px 40px;
          letter-spacing: 1px; font-weight: 600; border-radius: 12px;
        }
        .hero-btn-secondary {
          background: rgba(255,255,255,0.06); color: #f0ece4;
          border: 1px solid rgba(255,255,255,0.15); padding: 16px 36px;
          border-radius: 12px; font-size: 1rem; font-weight: 500;
          cursor: pointer; backdrop-filter: blur(12px);
          transition: all 0.3s; letter-spacing: 1px;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(201,169,110,0.4);
        }
        .hero-scroll-indicator {
          position: absolute; bottom: 40px; left: 50%;
          transform: translateX(-50%); z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0.5;
        }
        .hero-scroll-indicator span {
          font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text-secondary);
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(180deg, var(--accent-gold), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-badge { font-size: 0.65rem; padding: 6px 16px; letter-spacing: 2px; }
          .hero-description { font-size: 0.95rem; margin-bottom: 32px; }
          .hero-btn-primary { min-width: 160px; padding: 14px 28px; font-size: 0.9rem; }
          .hero-btn-secondary { padding: 14px 24px; font-size: 0.9rem; }
          .hero-scroll-indicator { bottom: 24px; }
        }
        @media (max-width: 480px) {
          .hero-badge { font-size: 0.6rem; padding: 5px 12px; letter-spacing: 1.5px; margin-bottom: 20px; }
          .hero-description { font-size: 0.85rem; margin-bottom: 28px; }
          .hero-buttons { flex-direction: column; align-items: center; gap: 12px; }
          .hero-btn-primary { width: 100%; max-width: 280px; }
          .hero-btn-secondary { width: 100%; max-width: 280px; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
