import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleListingButtonClick = () => {
    navigate('/coderByte_assignment/');
  };

  const pageStyles = {
    minHeight: '100vh',
    background: `url(/wpbackground.jpg) no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white',
    paddingTop: '200px'
  };

  const contentStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: '50px',
    borderRadius: '8px',
    maxWidth: '600px',
    textAlign: 'center',
  };

  const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    textDecoration: 'none',
  };
  const mediaQueryStyles = {
    '@media (maxWidth: 768px)': {
      backgroundSize: '100% 100%', 
    },
  };

  return (
    <div style={{ ...pageStyles, ...mediaQueryStyles }}>
      <div style={contentStyles}>
        <h1>Welcome to the HomePage</h1>
        <p>Watch Romantic Comedy Movies..</p>
        <button style={buttonStyles} onClick={handleListingButtonClick}>Please enjoy movies</button>
      </div>
    </div>
  );
}

export default HomePage;
