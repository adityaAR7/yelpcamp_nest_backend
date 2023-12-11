import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CampgroundModule } from './campground/campground.module';
import { CampgroundInfoModule } from './campground_info/campground_info.module';
import { AuthModule } from './auth/auth.module';
import { PsqlModule } from './psql/psql.module';
import { ConfigModule } from '@nestjs/config';
import { CampgroundCommentModule } from './campground_comment/campground_comment.module';

@Module({
  imports: [UserModule, CampgroundModule, CampgroundInfoModule, AuthModule, PsqlModule,ConfigModule.forRoot({}), CampgroundCommentModule]
})
export class AppModule {}
