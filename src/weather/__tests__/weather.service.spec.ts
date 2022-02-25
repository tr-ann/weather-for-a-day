import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { WeatherModule } from '../weather.module';
import { WeatherService } from '../weather.service';

jest.mock('../../helpers/configureApiUrl', () => ({
  configureApiUrl: () => '/test-url',
}));

describe('Weather service', () => {
  let weatherService: WeatherService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, WeatherModule],
    }).compile();

    httpService = await module.get(HttpService);
    weatherService = await module.get(WeatherService);
  });

  describe('when send the request', () => {
    const result = {
      data: { description: '123' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    it('should return description when called successfully', () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => of(result));

      weatherService
        .getWeather('34.65', '12.423', new Date())
        .subscribe((res) => {
          expect(res).toEqual(result.data);
        });
    });
  });
});
