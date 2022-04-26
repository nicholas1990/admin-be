import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  /**
   * Creates a date range from an year in input;
   *
   * @param year: number
   * @returns: array of intervals from and to
   */
  getYearInterval(year: number): Date[] {
    return [new Date(year), new Date(year, 11, 32)];
  }
}
