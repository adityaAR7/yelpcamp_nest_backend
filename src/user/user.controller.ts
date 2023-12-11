import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginAuthGuard } from 'src/auth/login.auth.guard';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.signIn(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    res.status(200).json({});
  }

  @UseGuards(LoginAuthGuard)
  @Post('login')
  logIn(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({
      success: true,
      message: 'Success',
      user: req.user,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('name/:id')
  async getName(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.getName(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  }
}
