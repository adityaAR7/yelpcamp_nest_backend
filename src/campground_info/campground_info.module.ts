import { Module } from '@nestjs/common';
import { CampgroundInfoController } from './campground_info.controller';
import { CampgroundInfoService } from './campground_info.service';

@Module({
  controllers: [CampgroundInfoController],
  providers: [CampgroundInfoService]
})
export class CampgroundInfoModule {}
