import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './google.auth.guard';
import { AuthenticatedGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleLoginCallback(@Req() req: Request,@Res() res: Response) {
    res.redirect(process.env.CLIENT_URL);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('login/success')
  loginSuccess(@Req() req: Request, @Res() res: Response) {
    return res
      .status(200)
      .json({ success: true, message: 'Success', user: req.user });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res:Response){
    req.logout(function(err) {
        if (err) { console.log(err); }
        res.redirect(process.env.CLIENT_URL);
      });
  }

}
