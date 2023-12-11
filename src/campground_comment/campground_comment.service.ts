import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CampgroundCommentService {
  constructor(@Inject('pg_connection') private db: any) {}
  async getCommentService(id: string) {
    try {
      const text = 'select * from user_comment where info_id=$1';
      const result = await this.db.query(text, [id]);

      if (result.rows.length > 0) {
        return {
          success: true,
          result: result.rows,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async addCommentService(
    infoId: string,
    comment: string,
    uid: string,
    name: string,
  ) {
    try {
      const text =
        'insert into user_comment(info_id,comment_date,comment,uid,name) values($1,$2,$3,$4,$5) returning *';
      const value = [infoId, new Date(), comment, uid, name];
      const result = await this.db.query(text, value);
      if (result.rows.length > 0) {
        return {
          success: true,
          result: result.rows[0],
        };
      } else {
        return null;
      }
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async editCommentService(id:string,comment:string){
    try {
      const text = "update user_comment set comment=$1 where id=$2";
      const value = [comment,id];
      const result = await this.db.query(text,value);
      return {success:true}
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async deleteCommentService(id:string){
    try {
      const text = "delete from user_comment where id=$1";
      await this.db.query(text,[id]);
      return {success:true}
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }
}
