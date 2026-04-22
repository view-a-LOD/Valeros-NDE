import { Component, inject, input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-highlighted-text',

  template: `<span [innerHTML]="sanitizedHtml()"></span>`,
  styles: `
    :host ::ng-deep mark {
      @apply bg-yellow-300 text-black;
    }
  `,
})
export class HighlightedTextComponent {
  text = input.required<string>();

  private sanitizer = inject(DomSanitizer);

  sanitizedHtml(): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this.text()) || '';
  }
}
