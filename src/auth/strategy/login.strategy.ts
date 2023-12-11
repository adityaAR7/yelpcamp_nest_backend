import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'loginAuth') {
  constructor(@Inject('pg_connection') private db: any, private readonly authService:AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.loginAuth(username,password);
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
