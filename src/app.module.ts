import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [VehiclesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
