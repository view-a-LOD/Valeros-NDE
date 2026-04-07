import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode, SearchValueObject } from '@valeros-ldkit/shared-types';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule],
  templateUrl: './search-result.component.html',
  standalone: true,
})
export class SearchResultComponent {
  result = input.required<SearchNode>();
  
  private router = inject(Router);

  getLabel(): string {
    return this.extractValue(this.result().label) || 'No label';
  }

  getDescription(): string | null {
    return this.extractValue(this.result().description);
  }

  navigateToDetails(): void {
    const id = this.result()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }

  private extractValue(valueObjects?: SearchValueObject[]): string | null {
    if (!Array.isArray(valueObjects) || valueObjects.length === 0) {
      return null;
    }

    const value = valueObjects[0]['@value'];

    if (!value) {
      return null;
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }
}
