# GameCord

GameCord는 Reddit의 커뮤니티 중심 콘텐츠 구조와 Discord의 실시간 소통 기능을 결합한 새로운 형태의 게임 커뮤니티 플랫폼입니다. 게이머들이 좋아하는 게임에 대해 깊이 있는 토론을 나누고, 실시간으로 소통하며, 게임 관련 콘텐츠를 공유할 수 있는 통합 환경을 제공합니다.

![game-cord-01](https://github.com/user-attachments/assets/20ede141-5b6a-451a-8ad5-d5a3413aee56)

## 🎮 주요 기능

### 커뮤니티 기능

- 📱 게임별 서브 커뮤니티 (서브코드) 생성 및 관리
- 💬 실시간 채팅과 음성 채널
- 🎯 투표 및 콘텐츠 큐레이션 시스템
- 🏆 사용자 평판 시스템

### 콘텐츠 관리

- 📝 마크다운 기반 리치 텍스트 에디터
- 🎬 게임 클립 및 스크린샷 공유
- 🏷️ 태그 기반 콘텐츠 분류
- 📊 인기 콘텐츠 큐레이션

### 사용자 경험

- 👤 커스터마이저블 프로필
- 🌙 다크/라이트 모드
- 🔔 실시간 알림 시스템
- 📱 반응형 모바일 최적화

### 소셜 기능

- 👥 친구 시스템
- 🎮 게임 세션 매칭
- 🏅 업적 및 뱃지 시스템
- 📊 게임 통계 통합

## 🛠️ 기술 스택

### 필수 환경

- Node.js v21
- pnpm v9

### 프론트엔드

- **프레임워크:** React v19, Next.js v15
- **인증:** Auth.js (NextAuth)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS + shadcn/ui
- **애니메이션:** Framer Motion
- **실시간 통신:** Socket.io

### 백엔드

- **데이터베이스:** MongoDB
- **ORM:** Mongoose
- **캐싱:** Redis
- **모니터링:** ELK(Elasticsearch, Logstash, Kibana)

## 🎯 1차 개발 목표 (MVP)

### 커뮤니티 핵심 기능

- [ ] 서브코드 생성 및 관리
- [ ] 게시물 CRUD
- [ ] 댓글 시스템
- [ ] 투표 시스템

### 실시간 소통

- [ ] 텍스트 채팅
- [ ] 음성 채널
- [ ] 실시간 알림

### 사용자 시스템

- [ ] 회원가입/로그인
- [ ] 프로필 관리
- [ ] 친구 시스템
- [ ] 평판 시스템

### 콘텐츠 관리

- [ ] 마크다운 에디터
- [ ] 미디어 업로드
- [ ] 태그 시스템
- [ ] 검색 기능

## 🚀 시작하기

```bash
# 저장소 복제
git clone https://github.com/joseph0926/game-cord.git

# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
pnpm dev
```

## 📦 환경 변수

```sh
DATABASE_URL= # MongoDB 연결 문자열

# Auth.js
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

## 🌟 주요 차별점

- Reddit 스타일의 콘텐츠 큐레이션과 Discord의 실시간 소통 통합
- 게임별 맞춤 커뮤니티 환경 제공
- 강력한 멀티미디어 콘텐츠 지원
- 게이머 친화적인 UI/UX
- 통합 게임 통계 및 프로필 시스템
