# Game-Cord

## 프로젝트 소개

- NextJs v13.5의 서버 컴포넌트를 적극 활용한 웹 애플리케이션
- Shadcn-ui, Clerk등 최신 기술들을 활용

GameCord에서 게임에 대한 평가와 리뷰를 남기고, 자유롭게 소통해보세요. 또한 모더들을 위한 커뮤니티까지 준비되어있습니다!

### 배포 링크

[GameCord](https://game-cord-six.vercel.app/)

### 프로젝트 데모
- AUTH
![gamecord-sign](https://github.com/joseph0926/GameCord/assets/100750188/983dd57e-5a6d-4446-a5bd-203e2546829b)


- MAIN
![GameCord-Main](https://github.com/joseph0926/GameCord/assets/100750188/cd6fd544-25bc-43ab-81f2-35eed25a5c92)

- Mobile
![GameCord-Mobile](https://github.com/joseph0926/GameCord/assets/100750188/cc2b0d29-cb2d-4422-92eb-95d24228e00e)

- CHAT
![GameCord-Chat](https://github.com/joseph0926/GameCord/assets/100750188/342f584a-9cb2-4413-8983-fa1947170ab4)

- CreatePost
![GameCord-CreatePost](https://github.com/joseph0926/GameCord/assets/100750188/3df838b3-14da-408a-9cc6-3c2d7142a2db)

- PostDetail
![GameCord-PostDetail](https://github.com/joseph0926/GameCord/assets/100750188/96192e6b-0f66-4042-98ea-8608163126c5)

- CreateGame
![GameCord-CreateGame](https://github.com/joseph0926/GameCord/assets/100750188/8115d6eb-d115-4705-8954-7085308fbe40)

- CreateServer
![GameCord-CreateServer](https://github.com/joseph0926/GameCord/assets/100750188/e51d47eb-409f-4d27-8331-e458178e8573)

### ERD
![prisma-erd](https://github.com/joseph0926/GameCord/assets/100750188/4c79efd4-42f1-441d-8a32-756dc24cf311)


## 주요 기능

- discord와 같은 서버&채널
- redis를 이용한 캐시 관리
- pusher를 이용한 실시간 채팅
- clerk을 이용한 간편한 인증
- shadcn-ui를 이용한 최신 UI

## 기술 스택

- 프레임워크: Next.js (v13.5)
- UI 컴포넌트 및 디자인: Tailwind 기반의 shadcn-ui

- 상태 관리: Zustand
- 데이터 페칭: React Query

- ORM: Prisma
- 데이터 검증: Zod
- 파일 업로드: Uploadthing
- 인증: Clerk
- Redis: @upstash/redis
- 실시간 기능: Pusher, Pusher-js

## 팀원

| Frontend                                                                                                          | Backend                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) | ![icon](https://github.com/joseph0926/project_02-MoneyNote/assets/100750188/212deebf-579d-409e-83b3-ead4e4ef7a90) |
| [김영훈](https://github.com/joseph0926)                                                                           | [김영훈](https://github.com/joseph0926)                                                                           |

## 실행 방법

```
//.env

DATABASE_URL=
PUSHER_SECRET=
PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
UPSTASH_REDIS_TOKEN=
UPSTASH_REDIS_URL=
UPLOADTHING_APP_ID=
UPLOADTHING_SECRET=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

// dev
npm run dev

```
