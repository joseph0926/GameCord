import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'login' }, loginDto));
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return firstValueFrom(this.authClient.send({ cmd: 'register' }, registerDto));
  }
}
