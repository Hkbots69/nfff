import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  ContentRow, 
  Modal 
} from './components';

// Mock TMDB API data for Netflix clone
const mockMoviesData = {
  hero: {
    id: 1,
    title: "The Diplomat",
    description: "In this suspenseful political drama, a diplomat's skills and marriage are put to the test when she becomes US ambassador to the UK after a deadly attack.",
    backgroundImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
    year: "2025",
    rating: "U/A 16+",
    badge: "2 EMMY NOMINATIONS",
    genre: "SERIES",
    videoId: "dQw4w9WgXcQ" // YouTube video ID for demo
  },
  
  rows: [
    {
      title: "US Crime TV Shows",
      movies: [
        {
          id: 2,
          title: "The Blacklist",
          image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          badge: "Recently added"
        },
        {
          id: 3,
          title: "Untamed",
          image: "https://images.unsplash.com/photo-1715305278832-4e4a15d1a083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "Recently added"
        },
        {
          id: 4,
          title: "Lincoln Lawyer",
          image: "https://images.unsplash.com/photo-1623841305968-f85336594764?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2024"
        },
        {
          id: 5,
          title: "Lucifer",
          image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023"
        },
        {
          id: 6,
          title: "The Residence",
          image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024"
        },
        {
          id: 7,
          title: "Brooklyn Nine-Nine",
          image: "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2023"
        }
      ]
    },
    
    {
      title: "Continue Watching for Timepass",
      movies: [
        {
          id: 8,
          title: "The Rookie",
          image: "https://images.unsplash.com/photo-1560109947-543149eceb16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxmaWxtfGVufDB8fHxibGFja3wxNzUzMzc4OTYyfDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          progress: 65
        },
        {
          id: 9,
          title: "Alice in Borderland",
          image: "https://images.unsplash.com/photo-1568876694728-451bbf694b83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxmaWxtfGVufDB8fHxibGFja3wxNzUzMzc4OTYyfDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          progress: 23
        },
        {
          id: 10,
          title: "The Great Indian Laughter",
          image: "https://images.unsplash.com/photo-1637335088701-d204113650f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "New Episodes",
          progress: 88
        },
        {
          id: 11,
          title: "Thum Kes Ko",
          image: "https://images.unsplash.com/photo-1602073396269-7bba5636e1a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          progress: 45
        },
        {
          id: 12,
          title: "Jaisa Koi Masley",
          image: "https://images.unsplash.com/photo-1514471157964-06459a4b9241?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "Recently added",
          progress: 12
        },
        {
          id: 13,
          title: "Criminal Code",
          image: "https://images.unsplash.com/photo-1704643671561-c7562fe150df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          progress: 78
        }
      ]
    },
    
    {
      title: "Top 10 TV Shows in India Today",
      movies: [
        {
          id: 14,
          title: "Untamed",
          image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "Recently added",
          rank: 1
        },
        {
          id: 15,
          title: "Great Indian Kapil",
          image: "https://images.unsplash.com/photo-1715305278832-4e4a15d1a083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "Watch Now",
          rank: 2
        },
        {
          id: 16,
          title: "Squid Game",
          image: "https://images.unsplash.com/photo-1623841305968-f85336594764?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxtb3ZpZSUyMHBvc3RlcnN8ZW58MHx8fGJsYWNrfDE3NTMzMDI0Njh8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          rank: 3
        },
        {
          id: 17,
          title: "Visa Ka Fool Volume",
          image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2024",
          badge: "Recently added",
          rank: 4
        },
        {
          id: 18,
          title: "RAW",
          image: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          badge: "Unhinged",
          rank: 5
        },
        {
          id: 19,
          title: "Stranger Things",
          image: "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxjaW5lbWF8ZW58MHx8fGJsYWNrfDE3NTMzNTUzNjB8MA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2024",
          rank: 6
        }
      ]
    },

    {
      title: "More Like This",
      movies: [
        {
          id: 20,
          title: "Story Tales",
          image: "https://images.unsplash.com/photo-1560109947-543149eceb16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxmaWxtfGVufDB8fHxibGFja3wxNzUzMzc4OTYyfDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 13+",
          year: "2025",
          duration: "2h 28m",
          description: "Raju, an Indian fisherman, is arrested after accidentally straying into foreign waters and faces a fraught journey home to his beloved Satya."
        },
        {
          id: 21,
          title: "Ankahee",
          image: "https://images.unsplash.com/photo-1568876694728-451bbf694b83?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxmaWxtfGVufDB8fHxibGFja3wxNzUzMzc4OTYyfDA&ixlib=rb-4.1.0&q=85",
          rating: "HD",
          year: "2023",
          duration: "2h 6m",
          description: "A young man gets a job at a cosmetics company and falls for his glamorous owner. But soon, unforeseen events begin to unfurl his family's dark past."
        },
        {
          id: 22,
          title: "Haami Mahataan",
          image: "https://images.unsplash.com/photo-1637335088701-d204113650f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2024",
          duration: "2h 23m",
          description: "When powerful forces threaten a young girl, a fearless man with a criminal past steps in to protect her and the community from danger."
        },
        {
          id: 23,
          title: "Animal",
          image: "https://images.unsplash.com/photo-1602073396269-7bba5636e1a8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2023",
          duration: "3h 24m",
          description: "This action-thriller about a young man on a vengeful path to avenge his father."
        },
        {
          id: 24,
          title: "Roar",
          image: "https://images.unsplash.com/photo-1514471157964-06459a4b9241?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2024",
          duration: "2h 30m",
          description: "After going their separate ways years ago, three old-skilled martial arts friends reunite."
        },
        {
          id: 25,
          title: "AMARAN",
          image: "https://images.unsplash.com/photo-1704643671561-c7562fe150df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxzdHJlYW1pbmclMjBjb250ZW50fGVufDB8fHxibGFja3wxNzUzMzc4OTQ2fDA&ixlib=rb-4.1.0&q=85",
          rating: "U/A 16+",
          year: "2024",
          duration: "2h 49m",
          description: "A young man in Chennai rises through the ranks of the Indian Army, fighting battles both internal and external."
        }
      ]
    }
  ]
};

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoPlaying, setCurrentVideoPlaying] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    setCurrentVideoPlaying(null);
  };

  const playVideo = (videoId) => {
    setCurrentVideoPlaying(videoId);
  };

  return (
    <div className="netflix-app">
      <Header />
      
      <HeroSection 
        movie={mockMoviesData.hero}
        onPlay={() => playVideo(mockMoviesData.hero.videoId)}
        onMoreInfo={() => openModal(mockMoviesData.hero)}
      />
      
      {mockMoviesData.rows.map((row, index) => (
        <ContentRow
          key={index}
          title={row.title}
          movies={row.movies}
          onMovieClick={openModal}
        />
      ))}
      
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={closeModal}
          onPlay={() => playVideo(selectedMovie.videoId || 'dQw4w9WgXcQ')}
        />
      )}
      
      {currentVideoPlaying && (
        <div className="video-player-overlay">
          <div className="video-container">
            <button 
              className="close-video-btn"
              onClick={() => setCurrentVideoPlaying(null)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideoPlaying}?autoplay=1`}
              title="Netflix Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;