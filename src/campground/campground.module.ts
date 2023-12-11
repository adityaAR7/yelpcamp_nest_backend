import { Module } from '@nestjs/common';
import { CampgroundController } from './campground.controller';
import { CampgroundService } from './campground.service';

@Module({
  controllers: [CampgroundController],
  providers: [CampgroundService]
})
export class CampgroundModule {}
