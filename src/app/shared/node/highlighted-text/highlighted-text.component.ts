import {
  Component,
  computed,
  inject,
  input,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TruncatedTextComponent } from '../truncated-text/truncated-text.component';

@Component({
  selector: 'app-highlighted-text',

  imports: [TruncatedTextComponent],
  template: `<app-truncated-text
    [text]="sanitizedText()"
    [maxLength]="maxLength()"
  />`,
  styles: `
    :host ::ng-deep mark {
      @apply bg-yellow-300 text-black;
    }
  `,
})
export class HighlightedTextComponent {
  text = input.required<string>();
  maxLength = input<number>();

  private sanitizer = inject(DomSanitizer);

  sanitizedText = computed(() => {
    return this.sanitizer.sanitize(SecurityContext.HTML, this.text()) || '';
  });
}
