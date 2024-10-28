import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  private readonly authClient: ClientProxy;

  @Post('login')
  async login(@Body() loginDto: unknown) {
    return firstValueFrom(this.authClient.send({ cmd: 'login' }, loginDto));
  }

  @Post('register')
  async register(@Body() registerDto: unknown) {
    return firstValueFrom(this.authClient.send({ cmd: 'register' }, registerDto));
  }
}
