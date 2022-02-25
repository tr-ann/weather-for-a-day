import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { configureApiUrl } from '../helpers/getConfiguredApiUrl';
import { getDateDifference } from '../helpers/getDateDifference';

@Injectable()
export class WeatherService {
  public constructor(private httpService: HttpService) {}

  public getWeather(lat: string, lon: string, date: Date) {
    const apiUrl = configureApiUrl(lat, lon);

    return this.httpService.get(apiUrl).pipe(
      map((res) => {
        const day = getDateDifference(new Date(), date);

        return res.data.daily[day].weather[0].description;
      }),
    );
  }
}
