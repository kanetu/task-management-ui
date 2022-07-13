import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml',
})
export class RemoveHtmlPipe implements PipeTransform {
  constructor() {}

  transform(value: string): string {
    return value
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');
  }
}
