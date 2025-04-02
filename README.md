# MBTI 테스트 애플리케이션

MBTI 테스트 애플리케이션은 사용자가 MBTI 성격 유형 검사를 진행하고 결과를 확인할 수 있는 웹 애플리케이션입니다.

## 기능

- 사용자 정보 입력 (별명, 성별, 나이, 학교)
- MBTI 테스트 진행
- 결과 확인
- Firebase를 통한 사용자 정보 및 테스트 결과 저장

## 설치 및 실행 방법

1. Node.js와 npm을 설치합니다.
2. 프로젝트 디렉토리에서 다음 명령어를 실행하여 종속성을 설치합니다:

```bash
npm install
```

3. Firebase 서비스 계정 키 파일(`mbti-result-firebase-adminsdk.json`)을 프로젝트 루트 디렉토리에 복사합니다.

4. Firebase 설정 정보를 `firebase-config.js` 파일에 업데이트합니다.

5. 서버를 시작합니다:

```bash
npm start
```

또는 개발 모드에서 실행:

```bash
npm run dev
```

6. 웹 브라우저에서 `http://localhost:3000`에 접속하여 애플리케이션을 사용합니다.

## 프로젝트 구조

- `main.html`: 메인 페이지
- `ques.html`: MBTI 테스트 페이지
- `result/`: MBTI 결과 페이지
- `firebase-config.js`: Firebase 클라이언트 구성
- `server.js`: Node.js 서버
- `package.json`: 프로젝트 의존성

## 사용된 기술

- HTML5, CSS3, JavaScript
- Node.js
- Express.js
- Firebase (Firestore) 