import React, { useState, useEffect, useMemo } from 'react';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = useMemo(() => [image1, image2, image3], []);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); 
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, images]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <h2>Slider Component</h2>
      <div style={{ position: 'relative' }}>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          style={{ maxWidth: '100%', maxHeight: '400px' }} 
        />
      </div>
      
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <button className="btn btn-primary mx-2" onClick={handleStart}>Start</button>
          <button className="btn btn-secondary mx-2" onClick={handlePrev}>Previous</button>
          <button className="btn btn-secondary mx-2" onClick={handleNext}>Next</button>
          <button className="btn btn-danger mx-2" onClick={handleStop}>Stop</button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
