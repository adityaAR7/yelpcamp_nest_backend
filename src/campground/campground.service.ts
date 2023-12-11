import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CampgroundService {
  constructor(@Inject('pg_connection') private db: any) {}
  async fetchCampgroundUserService(id: string) {
    try {
      let text =
        'select * from campground where id in (select cid from relation where uid=$1)';
      let result = await this.db.query(text, [id]);
      result = await Promise.all(
        result.rows.map(async (item: any) => {
          text =
            'select image from campground_info where cid=$1 and uid=$2 limit 1';
          const result1 = await this.db.query(text, [item.id, id]);
          return { ...item, ...result1.rows[0] };
        }),
      );
      return result;
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async fetchCampgroundAllService() {
    try {
      let text = 'select * from campground';
      let result = await this.db.query(text, []);
      result = await Promise.all(
        result.rows.map(async (item: any) => {
          text = 'select image from campground_info where cid=$1 limit 1';
          const result1 = await this.db.query(text, [item.id]);
          return { ...item, ...result1.rows[0] };
        }),
      );
      return result;
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async postNewCampgroundService(
    title: string,
    content: string,
    image: string,
    uid: string,
  ) {
    try {
      let text = 'insert into campground(title) values($1) returning *';
      let value = [title];
      const result = await this.db.query(text, value);

      text =
        'insert into campground_info(cid,image,content,uid) values($1,$2,$3,$4)';
      value = [result.rows[0].id, JSON.stringify(image), content, uid];
      await this.db.query(text, value);

      if (result.rows.length > 0) {
        text = 'insert into relation(uid,cid) values($1,$2) returning *';
        value = [uid, result.rows[0].id];
        const result1 = await this.db.query(text, value);
        if (result1.rows.length > 0) {
          return result.rows[0].id;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }

  async editCampgroundService(
    infoId: string,
    id: string,
    name: string,
    image: string,
    content: string,
  ) {
    try {
      let text = 'update campground set title=$1 where id=$2';
      let value = [name, id];
      await this.db.query(text, value);
      text = 'update campground_info set image=$1, content=$2 where id=$3';
      value = [JSON.stringify(image), content, infoId];
      await this.db.query(text, value);
      return { success: true };
    } catch (error) {
      throw new ForbiddenException('Internal Server Error');
    }
  }
}
