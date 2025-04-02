import React, { useState } from 'react';
import Head from 'next/head';
import LoginButton from '../components/LoginButton';
import Slideshow from '../components/Slideshow';
import UserInfoModal from '../components/UserInfoModal';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>MBTI 테스트</title>
        <meta name="description" content="나만의 MBTI 테스트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navbar}>
        <LoginButton />
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>😆 나만의 MBTI 테스트 😆</h1>
        <p className={styles.description}>당신의 성격을 알아볼 준비 되셨나요?</p>
        <button className={styles.startButton} onClick={openModal}>
          테스트 시작하기
        </button>

        <Slideshow />
      </main>

      <UserInfoModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
} 