import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Result.module.css';

// MBTI 유형별 결과 정보
const mbtiResults = {
  'ISTJ': {
    title: '논리주의자 (ISTJ)',
    description: '규칙을 중시하며 일을 체계적으로 처리하는 현실주의자입니다.',
    strengths: ['책임감이 강함', '헌신적이고 안정적', '체계적이고 논리적'],
    weaknesses: ['변화에 적응하기 어려울 수 있음', '지나치게 엄격할 수 있음']
  },
  'ISFJ': {
    title: '수호자 (ISFJ)',
    description: '타인을 보호하고 지원하는 헌신적이고 따뜻한 수호자입니다.',
    strengths: ['세심하고 배려심이 깊음', '헌신적이고 충성스러움', '실용적이고 세부사항에 주의를 기울임'],
    weaknesses: ['자신의 필요를 무시할 수 있음', '비판을 잘 받아들이지 못할 수 있음']
  },
  // 다른 MBTI 유형들의 결과 정보도 추가 (간략화)
};

export default function Result() {
  const router = useRouter();
  const [mbtiResult, setMbtiResult] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [resultContent, setResultContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    if (typeof window !== 'undefined') {
      const storedResult = sessionStorage.getItem('mbtiResult');
      const storedUserInfo = sessionStorage.getItem('userInfo');
      
      if (!storedResult || !storedUserInfo) {
        router.push('/');
        return;
      }
      
      setMbtiResult(storedResult);
      setUserInfo(JSON.parse(storedUserInfo));
      
      // 결과 내용 가져오기
      fetchResultContent(storedResult);
    }
  }, [router]);

  const fetchResultContent = async (mbtiType) => {
    try {
      const response = await fetch(`/result/result_${mbtiType}.html`);
      if (response.ok) {
        const html = await response.text();
        
        // HTML에서 결과 내용만 추출
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const container = doc.querySelector('.container');
        
        if (container) {
          setResultContent(container.innerHTML);
        } else {
          setResultContent('<h1>결과를 불러올 수 없습니다</h1>');
        }
      } else {
        // 해당 MBTI 결과 파일이 없을 경우 기본 메시지
        setResultContent(`<h1>아직 ${mbtiType} 결과 페이지가 준비되지 않았습니다</h1>`);
      }
    } catch (error) {
      console.error('결과 로딩 중 오류:', error);
      setResultContent('<h1>결과를 불러오는 중 오류가 발생했습니다</h1>');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userInfo || !mbtiResult) return;
    
    try {
      const response = await fetch('/api/save-mbti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: userInfo.nickname,
          gender: userInfo.gender,
          age: userInfo.age,
          school: userInfo.school,
          mbtiResult: mbtiResult
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('결과가 성공적으로 저장되었습니다!');
      } else {
        alert('결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('결과 저장 중 오류:', error);
      alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const handleRetakeTest = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>결과를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{userInfo.nickname}님의 MBTI - {mbtiResult}</title>
        <meta name="description" content={`MBTI 테스트 결과 - ${mbtiResult}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.resultContainer}>
          <div className={styles.userInfo}>
            <h1 className={styles.greeting}>
              {userInfo.nickname}님의 MBTI 결과
            </h1>
            <div className={styles.mbtiTag}>{mbtiResult}</div>
          </div>

          <div 
            className={styles.resultContent}
            dangerouslySetInnerHTML={{ __html: resultContent }}
          />
          
          <div className={styles.buttonContainer}>
            <button
              onClick={handleSave}
              className={styles.saveButton}
            >
              결과 저장하기
            </button>
            
            <button
              onClick={handleRetakeTest}
              className={styles.retakeButton}
            >
              테스트 다시하기
            </button>
          </div>
          
          <Link href="/" className={styles.homeLink}>
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
} 