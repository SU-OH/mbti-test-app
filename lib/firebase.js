import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 기존 firebaseConfig 정보를 사용합니다.
const firebaseConfig = {
  // 기존 설정 파일의 내용을 여기에 입력하세요
  // 클라이언트측 Firebase 설정
};

// Firebase 초기화
let firebaseApp;
let db;

// Firebase가 이미 초기화되었는지 확인
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

db = getFirestore();

export { db }; 