import { HttpModule } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { WeatherController } from '../weather.controller';
import { WeatherModule } from '../weather.module';
import { WeatherService } from '../weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, WeatherModule],
      controllers: [],
      providers: [],
    }).compile();

    weatherService = moduleRef.get<WeatherService>(WeatherService);
    weatherController = moduleRef.get<WeatherController>(WeatherController);
  });

  describe('get weather description', () => {
    it('should return an array of Weather', async () => {
      jest
        .spyOn(weatherService, 'getWeather')
        .mockImplementation(() => of('test description'));

      const weather = await weatherController.getWeather({
        latitude: '25.05',
        longitude: '23.12',
        date: '2022-02-26',
      });

      expect(weather.description).toBe('test description');
    });
  });
});
