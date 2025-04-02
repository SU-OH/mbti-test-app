import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/UserInfoModal.module.css';

const UserInfoModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    age: '',
    school: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 모든 필드가 채워졌는지 확인
    if (!formData.nickname || !formData.gender || !formData.age || !formData.school) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    // 사용자 정보를 세션 스토리지에 저장
    sessionStorage.setItem('userInfo', JSON.stringify(formData));
    
    // 설문 페이지로 이동
    router.push('/quiz');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2 className={styles.modalTitle}>테스트 시작하기</h2>
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label htmlFor="nickname">별명</label>
          <input 
            type="text" 
            id="nickname" 
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required 
            placeholder="별명을 입력하세요"
          />
          
          <label htmlFor="gender">성별</label>
          <select 
            id="gender" 
            name="gender" 
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">선택하세요</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
            <option value="기타">기타</option>
          </select>
          
          <label htmlFor="age">나이</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age}
            onChange={handleChange}
            required 
            min="1" 
            max="100" 
            placeholder="나이를 입력하세요"
          />
          
          <label htmlFor="school">학교</label>
          <input 
            type="text" 
            id="school" 
            name="school" 
            value={formData.school}
            onChange={handleChange}
            required 
            placeholder="학교를 입력하세요"
          />
          
          <button type="submit">테스트 시작</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoModal; 