import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'nlToBr',
  standalone: true,
})
export class NlToBrPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    const text = value.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
