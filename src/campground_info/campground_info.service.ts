import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CampgroundInfoService {
  constructor(@Inject('pg_connection') private db: any) {}
  async totalInfoService(id: string) {
    try {
      const text = 'select * from campground_info where cid=$1';
      const value = [id];
      const result = await this.db.query(text, value);
      return result.rows.length;
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async fetchInfo(id: string, type: string) {
    try {
      let text =
        'SELECT * FROM ( SELECT *, ROW_NUMBER() OVER (ORDER BY id) AS RowNum FROM campground_info where cid=$1) AS sub WHERE RowNum = $2';
      let result = await this.db.query(text, [id, type]);

      text = 'select title from campground where id=$1';
      const result1 = await this.db.query(text, [id]);

      if (result.rows.length > 0) {
        result = { ...result.rows[0], name: result1.rows[0].title };
        return result;
      } else {
        return null;
      }
    } catch (error) {
      throw new ForbiddenException('Internal Sever Error');
    }
  }

  async newInfo(id: string, uid: string, image: string, content: string) {
    try {
      const text =
        'insert into campground_info(cid,image,content,uid) values($1,$2,$3,$4)';
      const value = [id, JSON.stringify(image), content, uid];
      await this.db.query(text, value);
      return { success: true };
    } catch (error) {
      throw new ForbiddenException('Internal Sever Error');
    }
  }

  async deleteInfo(infoId: string, id: string, uid: string) {
    try {
      let text = 'delete from user_comment where info_id=$1';
      let value = [infoId];
      await this.db.query(text, value);
      text = 'delete from campground_info where id=$1';
      value = [infoId];
      await this.db.query(text, value);
      text = 'select * from campground_info where cid=$1';
      value = [id];
      const result = await this.db.query(text, value);

      if (result.rows.length == 0) {
        text = 'delete from relation where uid=$1 and cid=$2';
        value = [uid, id];
        await this.db.query(text, value);
        text = 'delete from campground where id=$1';
        value = [id];
        await this.db.query(text, value);
        return { isEmpty: true };
      } else {
        return { isEmpty: false };
      }
    } catch (error) {
      throw new ForbiddenException('Internal Sever Error');
    }
  }
}
