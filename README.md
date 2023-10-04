# Trip-Cord
![logo](https://github.com/joseph0926/TripCord/assets/100750188/a8fa4a5f-3f10-4885-b3ac-4f3608e3c59a)


## 프로젝트 소개

- NextJs v13.5의 서버 컴포넌트를 적극 활용한 웹 애플리케이션
- Shadcn-ui, Clerk등 최신 기술들을 활용

TripCord에서 친구들과의 여행 일정 계획부터 대화까지, 모든 것을 정해보세요!

### 배포 링크

[TripCord](https://trip-cord.vercel.app/)


### 프로젝트 데모



### ERD

![prisma-erd](https://github.com/joseph0926/TripCord/assets/100750188/1fc17eec-2072-48bd-8213-de500c2d6e91)



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
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/new-user
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

// dev
npm run dev

```
