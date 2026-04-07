import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { DynamicWidgetComponent } from '../../../../shared/components/widgets/dynamic-widget/dynamic-widget.component';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, DynamicWidgetComponent],
  templateUrl: './search-result.component.html',
  standalone: true,
})
export class SearchResultComponent {
  result = input.required<SearchNode>();

  private router = inject(Router);

  navigateToDetails(): void {
    const id = this.result()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }
}
