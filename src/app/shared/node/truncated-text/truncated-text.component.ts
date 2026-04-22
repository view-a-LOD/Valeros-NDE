import { Component, input } from '@angular/core';

@Component({
  selector: 'app-truncated-text',
  template: `<span [innerHTML]="truncatedText()"></span>`,
  styles: `
    :host ::ng-deep mark {
      @apply bg-transparent;
    }
  `,
})
export class TruncatedTextComponent {
  text = input.required<string>();
  maxLength = input<number>();

  truncatedText(): string {
    const max = this.maxLength();
    const text = this.text();
    if (!max || text.length <= max) {
      return text;
    }
    return text.substring(0, max) + '...';
  }
}
