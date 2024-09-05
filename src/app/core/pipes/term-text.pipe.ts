import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
  standalone: true
})
export class TermTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.split(' ', limit).join(' ');
  }

}
