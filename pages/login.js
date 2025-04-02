import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직은 기존과 동일하게 유지
    console.log('로그인 시도:', email, password);
    // 여기에 로그인 로직을 구현
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>로그인 - MBTI 테스트</title>
        <meta name="description" content="MBTI 테스트 로그인" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>로그인</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="이메일을 입력하세요"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
          </form>
          
          <div className={styles.links}>
            <Link href="/" className={styles.backLink}>
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 