import { Module } from '@nestjs/common';
import { CommitsModule } from './commits/commits.module';

@Module({
  imports: [CommitsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
