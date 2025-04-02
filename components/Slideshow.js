import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Slideshow.module.css';

const Slideshow = () => {
  const [slide, setSlide] = useState(0);

  const images = [
    '/picture/question1.png',
    '/picture/question2.png',
    '/picture/question3.png'
  ];

  const handleSlideChange = (index) => {
    setSlide(index);
  };

  const handleNext = () => {
    setSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.slideContainer} style={{ transform: `translateX(-${slide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className={styles.slideBox}>
            <div className={styles.imageWrapper}>
              <Image 
                src={image} 
                alt={`슬라이드 ${index + 1}`} 
                width={500}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button 
          className={`${styles.slideBtn} ${slide === 0 ? styles.active : ''}`} 
          onClick={() => handleSlideChange(0)}
        >
          1
        </button>
        <button 
          className={`${styles.slideBtn} ${slide === 1 ? styles.active : ''}`} 
          onClick={() => handleSlideChange(1)}
        >
          2
        </button>
        <button 
          className={`${styles.slideBtn} ${slide === 2 ? styles.active : ''}`} 
          onClick={() => handleSlideChange(2)}
        >
          3
        </button>
        <button className={styles.nextBtn} onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Slideshow; 