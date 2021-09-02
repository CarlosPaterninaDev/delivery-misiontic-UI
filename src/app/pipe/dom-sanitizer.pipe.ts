import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
})
export class DomSanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(image: string): unknown {
    const domImg = `background-image: url('${image}')`;

    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }
}
