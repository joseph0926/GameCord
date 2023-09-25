import http from 'http';
import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import { StatusCodes } from 'http-status-codes';
import compression from 'compression';
import 'express-async-errors';

import routes from '@/routes';
import { config } from '@/config';
import { CustomError, IErrorResponse } from '@/lib/error-handler';

const SERVER_PORT = 5000;

export class TripCordServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.protectedMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);

    this.globalErrorHandler(this.app);

    this.startServer(this.app);
  }

  private protectedMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false // 배포시 변경
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routeMiddleware(app: Application): void {
    routes(app);
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({ message: `${req.originalUrl}에 대한 요청은 잘못된 요청입니다.` });
    });

    app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }
  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      console.log(`서버가 포트번호 ${SERVER_PORT}에서 정상 작동중입니다.`);
    });
  }
}
