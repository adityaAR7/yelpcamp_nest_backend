import { Module } from '@nestjs/common';
import { CampgroundCommentController } from './campground_comment.controller';
import { CampgroundCommentService } from './campground_comment.service';

@Module({
  controllers: [CampgroundCommentController],
  providers: [CampgroundCommentService]
})
export class CampgroundCommentModule {}
