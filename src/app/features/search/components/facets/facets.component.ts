import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../state/search.store';

@Component({
  selector: 'app-facets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facets.component.html',
})
export class FacetsComponent {
  store = inject(SearchStore);
}
