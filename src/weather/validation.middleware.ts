import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getDateDifference } from 'src/helpers/getDateDifference';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const query = req.query;

    if (!query.latitude || !query.longitude) {
      throw new BadRequestException(
        'The latitude and longitude must be defined',
      );
    }

    const weatherDate = query.date
      ? new Date(query.date as string)
      : new Date();
    const currentDate = new Date();

    const dateDifference = getDateDifference(currentDate, weatherDate);

    if (dateDifference > 7 || dateDifference < 0) {
      throw new BadRequestException('The date must be within the next 7 days');
    }

    next();
  }
}
