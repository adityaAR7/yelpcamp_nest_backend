import { Global, Module } from '@nestjs/common';
import { Client, Pool } from 'pg';

const pg_provider = {
  provide:'pg_connection',
  useValue:new Pool({
    user:"postgres",
    password:"112358",
    host:"localhost",
    database: "yelpcamp",
    port: 5432,
})
}

@Global()
@Module({
  exports: [pg_provider],
  providers: [pg_provider]
})
export class PsqlModule {}
