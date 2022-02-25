import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { getDateDifference } from '../helpers/getDateDifference';
import { GetWeather } from './get-weather.model';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  public constructor(private weatherService: WeatherService) {}

  @Get()
  public async getWeather(@Query() query: GetWeather) {
    if (!query.latitude || !query.longitude) {
      throw new BadRequestException(
        'The latitude and longitude must be defined',
      );
    }

    const weatherDate = new Date(query.date);
    const currentDate = new Date();

    if (getDateDifference(currentDate, weatherDate) > 7) {
      throw new BadRequestException('The date must be within the next 7 days');
    }

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
