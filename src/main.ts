import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as cookieParser from 'cookie-parser';
import * as passport from "passport"
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials:true
  });
  app.use(express.json({limit:'50mb'}))
  
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,  
      cookie:{//for storing cookie in the client side
        maxAge:24 * 60 * 60 * 1000,
      }
    })
  )
  app.use(cookieParser(process.env.SECRET))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();
