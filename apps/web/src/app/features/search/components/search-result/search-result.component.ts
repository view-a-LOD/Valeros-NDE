import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode, SearchValueObject } from '@valeros-ldkit/shared-types';
import { HighlightedTextComponent } from '../../../../shared/components/highlighted-text/highlighted-text.component';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, HighlightedTextComponent],
  templateUrl: './search-result.component.html',
  standalone: true,
})
export class SearchResultComponent {
  result = input.required<SearchNode>();
  
  private router = inject(Router);

  getLabel(): string {
    return this.extractHighlightedValue(this.result().label) || 'No label';
  }

  getDescription(): string | null {
    return this.extractHighlightedValue(this.result().description);
  }

  navigateToDetails(): void {
    const id = this.result()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }

  private extractHighlightedValue(
    valueObjects?: SearchValueObject[],
  ): string | null {
    if (!Array.isArray(valueObjects) || valueObjects.length === 0) {
      return null;
    }

    const firstObject = valueObjects[0];

    if (firstObject.highlight) {
      return firstObject.highlight;
    }

    const value = firstObject['@value'];

    if (!value) {
      return null;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }
}
