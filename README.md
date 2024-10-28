# GameCord

레딧의 게임 관련 쓰레드와 디스코드의 기능을 합쳐 제공하는 게임 플랫폼입니다.

## 사용기술

```sh
# Frontend

NextJs v15

# Backend

Microservice
NestJs
```

## 프로젝트 구조

```
├── .github
│   └── workflows
│       └── ci.yml
├── .vscode
│   └── settings.json
├── README.md
└── server
    ├── .gitignore
    ├── .npmrc
    ├── .nvmrc
    ├── .prettierrc
    ├── eslint.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── scripts
    │   └── create-service.js
    ├── services
    │   ├── api-gateway
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── auth-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── chat-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── community-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── moderation-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── notification-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   ├── post-service
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── src
    │   │   │   ├── app.module.ts
    │   │   │   └── main.ts
    │   │   └── tsconfig.json
    │   └── user-service
    │       ├── nest-cli.json
    │       ├── package.json
    │       ├── src
    │       │   ├── app.module.ts
    │       │   └── main.ts
    │       └── tsconfig.json
    ├── shared
    │   ├── package.json
    │   ├── src
    │   │   ├── index.ts
    │   │   ├── interceptors
    │   │   │   ├── index.ts
    │   │   │   └── logging.interceptor.ts
    │   │   ├── interfaces
    │   │   │   ├── common.interface.ts
    │   │   │   ├── index.ts
    │   │   │   ├── logger.interface.ts
    │   │   │   └── user.interface.ts
    │   │   └── logger
    │   │       ├── index.ts
    │   │       ├── logger.module.ts
    │   │       └── logger.service.ts
    │   ├── tsconfig.json
    │   └── tsconfig.tsbuildinfo
    ├── tsconfig.json
    └── tsconfig.tsbuildinfo
```
