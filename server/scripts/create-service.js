const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const serviceName = process.argv[2];
if (!serviceName) {
  console.error("Please provide a service name");
  process.exit(1);
}

const serviceDir = path.join(__dirname, "../services", serviceName);

// Create service directory
fs.mkdirSync(serviceDir, { recursive: true });

// Create package.json
const packageJson = {
  name: `@app/${serviceName}`,
  version: "1.0.0",
  private: true,
  scripts: {
    build: "nest build",
    start: "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    test: "jest",
    "test:watch": "jest --watch",
    "test:e2e": "jest --config ./test/jest-e2e.json",
  },
  dependencies: {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/microservices": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@app/shared": "workspace:*",
    "reflect-metadata": "^0.1.13",
    rxjs: "^7.8.1",
  },
  devDependencies: {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    jest: "^29.5.0",
    "source-map-support": "^0.5.21",
    supertest: "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    typescript: "^5.1.3",
  },
};

fs.writeFileSync(
  path.join(serviceDir, "package.json"),
  JSON.stringify(packageJson, null, 2)
);

// Create tsconfig.json
const tsConfig = {
  extends: "../../tsconfig.json",
  compilerOptions: {
    outDir: "./dist",
    baseUrl: "./",
  },
  include: ["src/**/*"],
  exclude: ["node_modules", "dist"],
};

fs.writeFileSync(
  path.join(serviceDir, "tsconfig.json"),
  JSON.stringify(tsConfig, null, 2)
);

// Create basic service structure
const srcDir = path.join(serviceDir, "src");
fs.mkdirSync(srcDir, { recursive: true });

// Create main.ts
const mainTs = `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: process.env.PORT || 3000,
      },
    },
  );
  await app.listen();
}
bootstrap();
`;

fs.writeFileSync(path.join(srcDir, "main.ts"), mainTs);

// Create app.module.ts
const appModuleTs = `
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
`;

fs.writeFileSync(path.join(srcDir, "app.module.ts"), appModuleTs);

console.log(`Service ${serviceName} created successfully!`);
