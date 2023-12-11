import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { PsqlModule } from 'src/psql/psql.module';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/login.strategy';

@Module({
    imports:[PsqlModule,PassportModule.register({session:true})],
    controllers:[AuthController],
    providers:[AuthService,GoogleStrategy,SessionSerializer,LocalStrategy]
})
export class AuthModule {}
