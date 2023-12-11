import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CampgroundInfoService } from './campground_info.service';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('info')
export class CampgroundInfoController {
  constructor(private campground_infoService: CampgroundInfoService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('total/:id')
  async totalInfo(@Param('id') id: string, @Res() res: Response) {
    const result = await this.campground_infoService.totalInfoService(id);
    res.status(200).json({
      count: result
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('fetch/:id/:type')
  async fetchInfo(
    @Param('id') id: string,
    @Param('type') type: string,
    @Res() res: Response,
  ) {
    const result = await this.campground_infoService.fetchInfo(id, type);
    if (!result) {
      throw new NotFoundException('No information available');
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  }


  @UseGuards(AuthenticatedGuard)
  @Post('new/:id/:uid')
  async newInfo(
    @Param('id') id: string,
    @Param('uid') uid: string,
    @Body('image') image: string,
    @Body('content') content: string,
    @Res() res: Response,
  ) {
    const result = await this.campground_infoService.newInfo(
      id,
      uid,
      image,
      content,
    );
    res.status(200).json(result);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('delete/:infoId/:id/:uid')
  async deleteInfo(@Param('infoId') infoId:string,@Param('id') id:string,@Param('uid') uid:string,@Res() res: Response){
    const result = await this.campground_infoService.deleteInfo(infoId,id,uid);
    res.status(200).json(result);
  }


}
