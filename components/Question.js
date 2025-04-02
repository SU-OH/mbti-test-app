import React from 'react';
import Image from 'next/image';
import styles from '../styles/Question.module.css';

const Question = ({ question, options, selectedValue, onChange, questionIndex }) => {
  const handleOptionChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.questionContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={`/picture/question${questionIndex + 1}.png`}
          alt={`질문 ${questionIndex + 1}`}
          width={400}
          height={300}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          className={styles.questionImage}
          priority={questionIndex < 2}
        />
      </div>
      
      <div className={styles.options}>
        {options.map((option, idx) => (
          <label 
            key={idx} 
            className={`${styles.optionLabel} ${selectedValue === option.value ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name={`question${questionIndex + 1}`}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleOptionChange}
              required
              className={styles.radioInput}
            />
            <span className={styles.optionText}>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question; 