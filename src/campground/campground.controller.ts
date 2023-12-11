import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CampgroundService } from './campground.service';
import { AuthenticatedGuard } from 'src/auth/auth.guard';

@Controller('campground')
export class CampgroundController {
  constructor(private campgroundService: CampgroundService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('fetch/:id')
  async fetchCampgroundUser(@Param('id') id: string, @Res() res: Response) {
    const result = await this.campgroundService.fetchCampgroundUserService(id);
    res.status(200).json({
      success: true,
      result: result,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('all')
  async fetchCampgroundAll(@Res() res: Response) {
    const result = await this.campgroundService.fetchCampgroundAllService();
    res.status(200).json({
      success: true,
      result: result,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async postNewCampground(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('image') image: string,
    @Body('uid') uid: string,
    @Res() res: Response,
  ) {
    const result = await this.campgroundService.postNewCampgroundService(
      title,
      content,
      image,
      uid,
    );
    if (!result) {
      throw new NotFoundException('No campground found');
    }
    res.status(200).json({
      success: true,
      result: result,
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Put('edit/info/:infoId/:id')
  async editCampground(
    @Param('infoId') infoId: string,
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('image') image:string,
    @Body('content') content:string,
    @Res() res:Response
  ) {
    const result = await this.campgroundService.editCampgroundService(infoId,id,name,image,content);
    res.status(200).json(result);
  }
}
