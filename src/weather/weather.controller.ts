import { Controller, Get, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GetWeather } from './get-weather.model';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  public constructor(private weatherService: WeatherService) {}

  @Get()
  public async getWeather(@Query() query: GetWeather) {
    const weatherDate = query.date ? new Date(query.date) : new Date();

    const description = await lastValueFrom(
      this.weatherService.getWeather(
        query.latitude,
        query.longitude,
        weatherDate,
      ),
    );

    return { description };
  }
}
