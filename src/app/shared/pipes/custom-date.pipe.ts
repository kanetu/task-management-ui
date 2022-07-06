import { Inject, Pipe, PipeTransform } from '@angular/core';
import {
  DATE_FORMAT,
  DATE_FORMAT_DETAIL,
  SYSTEM_DATE_FORMAT,
} from 'src/app/constants/date-format';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  constructor(@Inject('MomentWrapper') private momentWrapper: any) {}

  switchFormat(format: string): string {
    switch (format) {
      case 'normal':
        return DATE_FORMAT;
      case 'system':
        return SYSTEM_DATE_FORMAT;
      default:
        return DATE_FORMAT_DETAIL;
    }
  }

  transform(date: Date | string, format: string = 'detail'): string {
    return date
      ? this.momentWrapper(date).format(this.switchFormat(format))
      : null;
  }
}
