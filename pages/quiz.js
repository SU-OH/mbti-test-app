import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Question from '../components/Question';
import styles from '../styles/Quiz.module.css';

// 퀴즈 문항 데이터 (ques.html에서 가져옴)
const quizData = [
  {
    options: [
      { value: 'E', text: '옆 사람에게 먼저 말을 걸어 인사를 나눈다.' },
      { value: 'E', text: '주위를 둘러보며 아는 친구를 찾는다.' },
      { value: 'I', text: '누가 말을 걸어주길 바라며 주변을 살핀다.' },
      { value: 'I', text: '조용히 자리에 앉아 강의 시작을 기다린다.' }
    ]
  },
  {
    options: [
      { value: 'E', text: '적극적으로 손을 들고 내 생각을 말한다.' },
      { value: 'E', text: '대답할 말이 없더라도 자신감 있게 참여한다.' },
      { value: 'I', text: '미리 정리된 생각이 있을 때만 조심스럽게 답한다.' },
      { value: 'I', text: '혹 내게 질문이 올까 긴장하며 눈을 피한다.' }
    ]
  },
  {
    options: [
      { value: 'E', text: '캠퍼스를 돌아다니며 사람들과 대화를 나눈다.' },
      { value: 'E', text: '시간 맞는 친구들과 만나서 카페에 간다.' },
      { value: 'I', text: '강의실이나 도서관에서 쉬면서 에너지를 충전한다.' },
      { value: 'I', text: '자취방이나 혼자있을 수 있는 공간에서 시간을 보내며 다음 수업 준비를 한다.' }
    ]
  },
  {
    options: [
      { value: 'E', text: '팀원들과 친해지기 위해 먼저 대화를 나눈다.' },
      { value: 'E', text: '적극적으로 아이디어를 내면서 회의를 이끌어간다.' },
      { value: 'I', text: '조용히 듣고 있다가 의견이 필요할 때만 발언한다.' },
      { value: 'I', text: '발표보다는 자료조사가 편하다고 말한다.' }
    ]
  },
  {
    options: [
      { value: 'E', text: '종강파티를 주도하면서 사람들을 모은다.' },
      { value: 'E', text: '"방학 때도 보자!" 하며 친구들과 약속을 잡는다.' },
      { value: 'I', text: '친한 몇 명과만 따로 만나기로 한다.' },
      { value: 'I', text: '조용히 인사만 하고 빠르게 집으로 간다.' }
    ]
  },
  {
    options: [
      { value: 'N', text: '다양한 활동을 생각하며 친구들과의 즐거운 시간을 기대하고 있다.' },
      { value: 'N', text: '친구들과 놀고 있을 나의 모습을 상상하고 있다.' },
      { value: 'S', text: '친구들과 함께할 활동을 고민하며, 즐거운 계획을 세우고 있다.' },
      { value: 'S', text: '준비물과 일정을 체크하며 기대감을 높이고 있다.' }
    ]
  },
  {
    options: [
      { value: 'N', text: '전체적인 원리와 개념을 먼저 이해하려 한다.' },
      { value: 'N', text: '이 개념이 다른 분야에 어떻게 적용될지 생각한다.' },
      { value: 'S', text: '실용적인 예시를 통해 개념을 익힌다.' },
      { value: 'S', text: '문제를 직접 풀어보면서 개념을 체득한다.' }
    ]
  },
  {
    options: [
      { value: 'N', text: '가사가 전해주는 분위기와 메시지에 푹 빠져서 상상에 잠긴다.' },
      { value: 'N', text: '이 노래를 들으면 영화 한 장면이 떠올린다.' },
      { value: 'S', text: '리듬과 멜로디가 너무 좋아서 저절로 따라 부르게 된다.' },
      { value: 'S', text: '보컬의 목소리 톤과 악기 소리에 집중해서 듣게 된다.' }
    ]
  },
  {
    options: [
      { value: 'N', text: '집의 인테리어와 조명, 분위기를 상상하며 내가 살고 있는 모습을 그려본다.' },
      { value: 'N', text: '집을 어떻게 꾸밀지 상상한다.' },
      { value: 'S', text: '집의 크기, 구조, 시설 등을 체크리스트로 만들어서 꼼꼼히 확인한다.' },
      { value: 'S', text: '물은 잘 나오는지, 전기는 잘 들어오는지 실용적인 것을 위주로 확인한다.' }
    ]
  },
  {
    options: [
      { value: 'N', text: '즉흥적으로 새로운 장소를 탐험하며 분위기를 만끽한다.' },
      { value: 'N', text: '여행을 통해 새로운 경험과 영감을 얻고 싶다.' },
      { value: 'S', text: '현실적인 준비물을 철저히 챙겨야 안심된다.' },
      { value: 'S', text: '세부적인 일정과 교통편을 미리 계획해 둔다.' }
    ]
  },
  {
    options: [
      { value: 'T', text: '핵심 개념을 논리적으로 정리하며 집중해서 듣는다.' },
      { value: 'T', text: '강의 내용이 이치에 맞는지 분석하며 듣는다.' },
      { value: 'F', text: '배운 내용이 사람들에게 어떤 영향을 미칠지 생각한다.' },
      { value: 'F', text: '교수님의 말투나 분위기에 따라 몰입도가 달라진다.' }
    ]
  },
  {
    options: [
      { value: 'T', text: '감정보다는 사실을 바탕으로 상황을 해결하려 한다.' },
      { value: 'T', text: '상대방의 기분보다는 내 논리가 맞다는 걸 증명하는 게 우선이다.' },
      { value: 'F', text: '팀원들의 감정을 먼저 살피며 중재하려 한다.' },
      { value: 'F', text: '상대방이 기분 나쁘지 않도록 조심스럽게 의견을 낸다.' }
    ]
  },
  {
    options: [
      { value: 'T', text: '망한 과목은 빠르게 잊고, 다음 시험에 집중한다.' },
      { value: 'T', text: '"어디서 틀렸지?" 하며 분석하고 개선 방법을 찾는다.' },
      { value: 'F', text: '스스로를 위로하면서 기분을 풀려고 한다.' },
      { value: 'F', text: '"나 너무 못했어..." 하며 기분이 가라앉는다.' }
    ]
  },
  {
    options: [
      { value: 'T', text: '친구에게 위로의 말을 건넨 뒤 속으로 나만 망한 게 아니라 다행이라 생각한다.' },
      { value: 'T', text: '다음 시험에는 더 열심히 공부하라고 조언해 준다.' },
      { value: 'F', text: '너무 속상해하지 말고, 같이 공부해 보자고 위로한다.' },
      { value: 'F', text: '친구와 같은 경험이 있는 내 경험을 이야기하며 친구의 기분을 위로해 준다.' }
    ]
  },
  {
    options: [
      { value: 'T', text: '연봉과 안정성을 분석하고 합리적으로 결정한다.' },
      { value: 'T', text: '나의 역량이 가장 잘 활용될 수 있는 직업을 선택한다.' },
      { value: 'F', text: '사람들과의 관계나 조직의 분위기가 나에게 맞는지를 본다.' },
      { value: 'F', text: '내가 행복하게 일할 수 있는지를 가장 중요하게 생각한다.' }
    ]
  },
  {
    options: [
      { value: 'J', text: '원하는 강의를 빠르게 신청할 수 있도록 전략을 세운다.' },
      { value: 'J', text: '미리 시간표를 짜고 원하는 과목을 정리해 둔다.' },
      { value: 'P', text: '인기 강의를 놓치면 다른 과목을 대체하면 된다고 생각한다.' },
      { value: 'P', text: '당일에 마음 내키는 대로 선택한다.' }
    ]
  },
  {
    options: [
      { value: 'J', text: '계획적으로 시간을 배분하며 차근차근 진행한다.' },
      { value: 'J', text: '마감 기한 전에 미리 끝내 놓는다.' },
      { value: 'P', text: '필요할 때마다 조금씩 하다가 마지막에 한 번에 끝낸다.' },
      { value: 'P', text: '마감 직전에 몰아서 한다.' }
    ]
  },
  {
    options: [
      { value: 'J', text: '시험 일정에 맞춰 계획을 세우고 준비한다.' },
      { value: 'J', text: '미리 정리한 노트와 자료를 활용해서 공부한다.' },
      { value: 'P', text: '내가 하고 싶은 과목 위주로 공부한다.' },
      { value: 'P', text: '시험 하루 전날 밤을 새워 공부한다.' }
    ]
  },
  {
    options: [
      { value: 'J', text: '시험 결과를 기록하고, 어떤 부분을 개선할지 계획을 세운다.' },
      { value: 'J', text: '시험이 끝난 후 바로 복습을 하고 다음 시험 준비를 시작한다.' },
      { value: 'P', text: '시험기간에 받은 스트레스를 친구들과 놀러 가서 해소한다.' },
      { value: 'P', text: '시험 결과를 생각하지 않고, 즉흥적으로 다른 활동을 즐긴다.' }
    ]
  },
  {
    options: [
      { value: 'J', text: '할 일을 정리하고 계획적으로 움직인다.' },
      { value: 'J', text: '플래너를 이용해 하루를 철저히 관리하여 갓생러가 되기 위해 노력한다.' },
      { value: 'P', text: '중요한 일정만 기억하고 필요할 때 정리한다.' },
      { value: 'P', text: '한 학기 동안 고생한 나를 위해 신나는 방학을 즐긴다.' }
    ]
  }
];

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(''));
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 사용자 정보가 없으면 메인 페이지로 리다이렉트
    const storedUserInfo = typeof window !== 'undefined' ? sessionStorage.getItem('userInfo') : null;
    
    if (!storedUserInfo) {
      router.push('/');
    } else {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoading(false);
    }
  }, [router]);

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      if (answers[currentQuestion]) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert('질문에 답변해주세요.');
      }
    }
  };

  const handleSubmit = async () => {
    // 모든 질문에 답변했는지 확인
    if (answers.slice(0, quizData.length).includes('')) {
      alert('모든 질문에 답변해주세요.');
      return;
    }

    // 여기서 MBTI 계산 로직
    const mbtiResult = calculateMBTI(answers);
    
    // 결과 저장
    try {
      // 결과를 세션 스토리지에 저장
      sessionStorage.setItem('mbtiResult', mbtiResult);
      sessionStorage.setItem('userAnswers', JSON.stringify(answers));
      
      // 결과 페이지로 이동
      router.push('/result');
    } catch (error) {
      console.error('결과 저장 중 오류 발생:', error);
      alert('결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const calculateMBTI = (answers) => {
    // MBTI 계산 로직
    let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
    
    // E/I 계산 (질문 1-5)
    answers.slice(0, 5).forEach(answer => {
      if (answer === 'E') e++;
      if (answer === 'I') i++;
    });
    
    // S/N 계산 (질문 6-10)
    answers.slice(5, 10).forEach(answer => {
      if (answer === 'S') s++;
      if (answer === 'N') n++;
    });
    
    // T/F 계산 (질문 11-15)
    answers.slice(10, 15).forEach(answer => {
      if (answer === 'T') t++;
      if (answer === 'F') f++;
    });
    
    // J/P 계산 (질문 16-20)
    answers.slice(15, 20).forEach(answer => {
      if (answer === 'J') j++;
      if (answer === 'P') p++;
    });
    
    const mbti = [
      e > i ? 'E' : 'I',
      s > n ? 'S' : 'N',
      t > f ? 'T' : 'F',
      j > p ? 'J' : 'P'
    ].join('');
    
    return mbti;
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MBTI 테스트 - 질문 {currentQuestion + 1}</title>
        <meta name="description" content="MBTI 테스트 질문" />
      </Head>

      <main className={styles.main}>
        <div className={styles.quizContainer}>
          <div className={styles.progressContainer}>
            <span className={styles.progressText}>질문 {currentQuestion + 1} / {quizData.length}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Question
            options={quizData[currentQuestion].options}
            selectedValue={answers[currentQuestion]}
            onChange={handleAnswerChange}
            questionIndex={currentQuestion}
          />

          <div className={styles.navigationButtons}>
            <button 
              onClick={goToPrevQuestion} 
              disabled={currentQuestion === 0}
              className={`${styles.navButton} ${currentQuestion === 0 ? styles.disabled : ''}`}
            >
              이전
            </button>
            
            {currentQuestion < quizData.length - 1 ? (
              <button 
                onClick={goToNextQuestion} 
                className={`${styles.navButton} ${answers[currentQuestion] ? '' : styles.disabled}`}
                disabled={!answers[currentQuestion]}
              >
                다음
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className={styles.submitButton}
                disabled={!answers[currentQuestion]}
              >
                결과 보기
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 