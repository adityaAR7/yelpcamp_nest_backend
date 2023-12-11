import { Inject, Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@Inject('pg_connection') private db: any){
        super();
    }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id)
  }
  async deserializeUser(
    id: any,
    done: any
  ): Promise<any> {
    try {
        const text = "select * from user_yelpcamp where id=$1";
        const value = [id];
        const result = await this.db.query(text, value);
        if (result.rows.length > 0) {
          done(null, result.rows[0]);
        } else {
          done(null, false, { message: "User not found" });
        }
      } catch (error) {
        throw error;
      }
  }
}