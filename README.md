# GameCord

레딧의 게임 관련 쓰레드와 디스코드의 기능을 합쳐 제공하는 게임 플랫폼입니다.

## 프로젝트 구조

```
// server - microservice

├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts
│   └── create-service.js
├── services
│   ├── api-gateway
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── auth-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── chat-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── community-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── moderation-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── notification-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   ├── post-service
│   │   ├── package.json
│   │   ├── src
│   │   └── tsconfig.json
│   └── user-service
│       ├── package.json
│       ├── src
│       └── tsconfig.json
├── shared
│   ├── package.json
│   ├── src
│   │   ├── constants
│   │   ├── index.ts
│   │   ├── interfaces
│   │   ├── types
│   │   └── utils
│   └── tsconfig.json
└── tsconfig.json
```
