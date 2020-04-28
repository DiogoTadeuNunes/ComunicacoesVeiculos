import { formatDate } from '@angular/common';

export class Helper {

  getFormatDate(date: string, format: string) {
    return formatDate(date, format, 'en');
  }

}
