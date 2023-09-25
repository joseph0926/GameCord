import express, { Express } from 'express';
import { TripCordServer } from '@/setupServer';
import { config } from '@/config';

class TripCordApplication {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    const server: TripCordServer = new TripCordServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const tripCordApplication: TripCordApplication = new TripCordApplication();
tripCordApplication.initialize();
