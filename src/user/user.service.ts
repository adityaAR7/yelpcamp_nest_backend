import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('pg_connection') private db: any) {}
  async signIn(username: string, password: string) {
    try {
      const hash = await bcrypt.hash(password, Number(process.env.SALTROUND));
      const text =
        'insert into user_yelpcamp(name,password) values ($1,$2) RETURNING *';
      const value = [username, hash];
      const result = await this.db.query(text, value);
      if (result.rows.length > 0) {
        return result.rows[0];
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

  async getName(id: string) {
    try {
      const text = 'select name from user_yelpcamp where id=$1';
      const result = await this.db.query(text, [id]);
      return result.rows[0].name;
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }
}
