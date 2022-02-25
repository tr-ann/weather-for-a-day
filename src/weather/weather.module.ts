import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ValidationMiddleware } from './validation.middleware';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes(WeatherController);
  }
}
