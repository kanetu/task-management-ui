import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  constructor() {}

  transform(value: any[]) {
    return value.slice().reverse();
  }
}
