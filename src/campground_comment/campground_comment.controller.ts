import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { CampgroundCommentService } from './campground_comment.service';

@Controller('comment')
export class CampgroundCommentController {
  constructor(private campgroundCommentService: CampgroundCommentService) {}
  @UseGuards(AuthenticatedGuard)
  @Get('info/:id')
  async getComment(@Param('id') id: string, @Res() res: Response) {
    const result = await this.campgroundCommentService.getCommentService(id);
    if (!result) {
      throw new NotFoundException('No comment available');
    }
    res.status(200).json(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('new/info')
  async addComment(
    @Body('infoId') infoId: string,
    @Body('comment') comment: string,
    @Body('uid') uid: string,
    @Body('name') name: string,
    @Res() res: Response,
  ) {
    const result = await this.campgroundCommentService.addCommentService(
      infoId,
      comment,
      uid,
      name,
    );
    if (!result) {
      throw new NotFoundException('No comment available');
    }
    res.status(200).json(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('edit/info/:id')
  async editComment(@Param('id') id:string,@Body('comment') comment:string,@Res() res:Response){
    const result = await this.campgroundCommentService.editCommentService(id,comment);
    res.status(200).json(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete/:id')
  async deleteComment(@Param('id') id:string,@Res() res:Response){
    const result = await this.campgroundCommentService.deleteCommentService(id);
    res.status(200).json(result);
  }
}
