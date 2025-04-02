import admin from 'firebase-admin';

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: '허용되지 않는 메소드입니다.' });
  }

  try {
    const { nickname, gender, age, school, mbtiResult, rawAnswers, rawScores } = req.body;
    
    if (!nickname || !gender || !age || !school || !mbtiResult) {
      return res.status(400).json({ success: false, message: '모든 필드가 필요합니다.' });
    }
    
    const db = admin.firestore();
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
} 