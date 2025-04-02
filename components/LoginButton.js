import React from 'react';
import Link from 'next/link';
import styles from '../styles/LoginButton.module.css';

const LoginButton = () => {
  return (
    <Link href="/login" className={styles.loginBtn}>
      로그인
    </Link>
  );
};

export default LoginButton; 