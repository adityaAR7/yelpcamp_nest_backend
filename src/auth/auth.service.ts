import { ForbiddenException, Inject, Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('pg_connection') private db: any) {}
  async googleAuth(profile: any) {
    try {
      const text = 'select * from user_yelpcamp where profile_id=$1';
      const value = [profile.id];
      const result = await this.db.query(text, value);
      if (result.rows.length == 0) {
        const text =
          'insert into user_yelpcamp(name,profile_id,photo) values($1,$2,$3) RETURNING *';
        const value = [
          profile.displayName,
          profile.id,
          profile.photos[0].value,
        ];
        const result = await this.db.query(text, value);
        if (result.rows.length > 0) {
          return result.rows[0];
        } else {
          return null;
        }
      } else {
        return result.rows[0];
      }
    } catch (error) {
      throw new ForbiddenException({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }

  async loginAuth(username: string, password: string) {
    try {
      const text = 'select * from user_yelpcamp where name=$1';
      const value = [username];
      const result = await this.db.query(text, value);
      if (result.rows.length > 0) {
        const flag = await bcrypt.compare(password, result.rows[0].password);
        if (flag) {
          return result.rows[0];
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new ForbiddenException({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
