const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

// Firebase Admin SDK 초기화
const serviceAccount = require('./mbti-result-firebase-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.')));

// 루트 경로('/')에 대한 처리 추가
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// 다른 HTML 파일에 대한 명시적 라우트 추가
app.get('/main.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/ques.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ques.html'));
});

// MBTI 결과 저장 API 엔드포인트
app.post('/api/save-mbti', async (req, res) => {
  try {
    const { nickname, gender, age, school, mbtiResult, rawAnswers, rawScores } = req.body;
    
    if (!nickname || !gender || !age || !school || !mbtiResult) {
      return res.status(400).json({ success: false, message: '모든 필드가 필요합니다.' });
    }
    
    const docRef = await db.collection('mbtiResults').add({
      nickname,
      gender,
      age: parseInt(age),
      school,
      mbtiResult,
      rawAnswers: rawAnswers || "",
      rawScores: rawScores || {},
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ 
      success: true, 
      message: '결과가 성공적으로 저장되었습니다.',
      id: docRef.id 
    });
  } catch (error) {
    console.error('MBTI 결과 저장 중 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`다음 URL로 접속하세요: http://localhost:${PORT}`);
}); 