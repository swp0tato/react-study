# Welcome to 🧀 Yummy!
디저트 메뉴를 고민하는 분들께 yummy! 를 소개합니다.
<br>
<p>
<b>우리는 어떤 서비스를 제공하는가 ? </b>

다양한 디저트들 중에서 무엇을 먹을지 결정하지 못하는 우리의 모습을 생각하며 개발되었습니다.

자동으로 위치 기반 카페를 검색해주는 기능이 있으며, 해당 지역 날씨에 맞춰서 카페를 추천해주고 있습니다.
</p>


<br>

## 🛠️ Stack

### Frontend

- html
- css
- javascript
- react

### DB

- firebase

### Communication
  
 - Notion
 - Discord
 - Figma

<br>

## 🌐 API

- Kakao 지도 API
- Kakao 검색 API
- OpenWeatherMap 날씨 API

<br>

## 📌 Branches

- `master` branch : 배포용 브랜치 (절대 터치 ❌)
- `FE` branch : 개발을 진행할 브랜치
- `팀원별 name` branch : 개인별 작업 브랜치

<br>

## 📁 폴더 구조

```
react-study/
│
├── public/
│   ├── index.html        # 리액트 앱의 진입점 HTML 파일
│   └── ...               # 기타 정적 자원 (이미지, 폰트 등)
│
├── src/
│   ├── common/           # 공통 유틸리티 및 함수
│   │   └── ...
│   │
│   ├── components/       # 재사용 가능한 리액트 컴포넌트들
│   │   └── ...
│   │
│   ├── constants/        # 상수 및 설정 값들
│   │   └── ...
│   │
│   ├── hooks/            # 커스텀 리액트 훅들
│   │   └── ...
│   │
│   ├── layout/           # 레이아웃 관련 컴포넌트들 (헤더, 사이드바 등)
│   │   └── ...
│   │
│   ├── pages/            # 페이지 컴포넌트들 (라우팅될 화면들)
│   │   └── ...
│   │
│   ├── utils/            # 유틸리티 함수 및 도우미 클래스
│   │   └── ...
│   │
│   ├── App.css           # 앱 전역 CSS 스타일
│   ├── App.js            # 앱 컴포넌트 진입점
│   ├── index.css         # 전역 CSS 스타일
│   └── index.js          # 앱 초기화 및 렌더링 진입점
│
└── .gitignore            # Git으로 관리되지 않을 파일 및 폴더 목록
```
