import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'humanReadableDate'
})
export class HumanReadableDatePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return ''; // or any default value you prefer when the input is null
    }
    const datePipe: DatePipe = new DatePipe('en-US');
    const transformedDate = datePipe.transform(value, 'mediumDate');
    return transformedDate || ''; // Handle case where transformation fails
  }
}
