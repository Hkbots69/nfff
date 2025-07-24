import React, { useState, useEffect, useRef } from 'react';

// Netflix Header Component
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`netflix-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <div className="netflix-logo">NETFLIX</div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active">Home</a>
          <a href="#" className="nav-item">TV Shows</a>
          <a href="#" className="nav-item">Movies</a>
          <a href="#" className="nav-item">Games</a>
          <a href="#" className="nav-item">New & Popular</a>
          <a href="#" className="nav-item">My List</a>
          <a href="#" className="nav-item">Browse by Languages</a>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <div className="notification-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <div className="notification-badge">1</div>
        </div>
        <div className="profile-dropdown">
          <div className="profile-avatar"></div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

// Netflix Hero Section Component
export const HeroSection = ({ movie, onPlay, onMoreInfo }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${movie.backgroundImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-badge">{movie.badge}</div>
          <div className="hero-genre">{movie.genre}</div>
          <h1 className="hero-title">{movie.title}</h1>
          <div className="hero-meta">
            <span className="hero-year">{movie.year}</span>
            <span className="hero-rating">{movie.rating}</span>
          </div>
          <p className="hero-description">{movie.description}</p>
          
          <div className="hero-actions">
            <button className="play-btn" onClick={onPlay}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>
            <button className="more-info-btn" onClick={onMoreInfo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              More Info
            </button>
          </div>
        </div>
        
        <div className="hero-controls">
          <button 
            className="mute-btn"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
          <div className="age-rating">{movie.rating}</div>
        </div>
      </div>
      
      <div className="hero-gradient"></div>
    </div>
  );
};

// Content Row Component
export const ContentRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = rowRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleScroll = () => {
    const container = rowRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.offsetWidth
    );
  };

  useEffect(() => {
    const container = rowRef.current;
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        {canScrollLeft && (
          <button className="scroll-btn scroll-left" onClick={() => scroll('left')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}
        
        <div className="movies-container" ref={rowRef}>
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)}
              rank={movie.rank}
            />
          ))}
        </div>
        
        {canScrollRight && (
          <button className="scroll-btn scroll-right" onClick={() => scroll('right')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Movie Card Component
export const MovieCard = ({ movie, onClick, rank }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 100); // Reduced delay for testing
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(false);
  };

  return (
    <div 
      className={`movie-card ${rank ? 'ranked-card' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {rank && <div className="rank-number">{rank}</div>}
      
      <div className="movie-image-container">
        <img src={movie.image} alt={movie.title} className="movie-image" />
        {movie.progress && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${movie.progress}%` }}
            ></div>
          </div>
        )}
        {movie.badge && (
          <div className="movie-badge">{movie.badge}</div>
        )}
      </div>
      
      {/* Force show on first card for debugging */}
      {(isHovered || movie.id === 2) && (
        <div className="netflix-mini-modal">
          <div className="mini-modal-image-container">
            <img src={movie.image} alt={movie.title} className="mini-modal-image" />
            <div className="mini-modal-overlay">
              <div className="mini-modal-controls">
                <button className="mini-play-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="mini-add-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </button>
                <button className="mini-like-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                  </svg>
                </button>
                <button className="mini-dislike-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                  </svg>
                </button>
                <button className="mini-expand-btn" onClick={onClick}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
              </div>
              
              {movie.progress && (
                <div className="mini-modal-progress">
                  <div className="progress-text">
                    {Math.floor((movie.progress / 100) * 164)} of 164m
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mini-modal-info">
            <div className="mini-modal-meta">
              <span className="match-score">98% Match</span>
              <span className="mini-rating">{movie.rating}</span>
              <span className="mini-year">{movie.year}</span>
              <span className="mini-hd">HD</span>
            </div>
            
            <div className="mini-modal-genres">
              <span>Crime</span>
              <span className="genre-dot">•</span>
              <span>Drama</span>
              <span className="genre-dot">•</span>
              <span>Thriller</span>
            </div>
          </div>
          
          <div className="mini-modal-arrow"></div>
        </div>
      )}
    </div>
  );
};

// Modal Component
export const Modal = ({ movie, onClose, onPlay }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="modal-video-section">
          <img src={movie.image} alt={movie.title} className="modal-image" />
          <div className="modal-video-overlay">
            <div className="modal-video-info">
              <h2 className="modal-title">{movie.title}</h2>
              <div className="modal-progress">
                <span className="progress-time">7 of 164m</span>
              </div>
            </div>
            
            <div className="modal-video-controls">
              <button className="modal-play-btn" onClick={onPlay}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Resume
              </button>
              <button className="modal-add-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
              <button className="modal-like-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                </svg>
              </button>
              <button className="modal-volume-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-details">
          <div className="modal-left-details">
            <div className="modal-meta">
              <span className="modal-year">{movie.year}</span>
              <span className="modal-duration">{movie.duration || "2h 44m"}</span>
              <span className="modal-hd">HD</span>
              <span className="modal-rating">{movie.rating || "U/A 16+"}</span>
              <div className="modal-audio-subtitle">
                <span>Spatial Audio</span>
              </div>
            </div>
            
            <div className="modal-languages">
              <strong>Watch in Tamil, Telugu, Malayalam, Kannada, Hindi</strong>
            </div>
            
            <p className="modal-description">
              {movie.description || "When a fatal shootout ruins a young boy's life, a gangster takes him in. Years later, a struggle for power leads them down a dark path."}
            </p>
          </div>
          
          <div className="modal-right-details">
            <div className="modal-cast">
              <span><strong>Cast:</strong> Kamal Haasan, Silambarasan TR, Trisha Krishnan, <em>more</em></span>
            </div>
            <div className="modal-genres">
              <span><strong>Genres:</strong> Crime Movies, Drama Movies, Action & Adventure Movies</span>
            </div>
            <div className="modal-maturity">
              <span><strong>This Movie is:</strong> Emotional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};