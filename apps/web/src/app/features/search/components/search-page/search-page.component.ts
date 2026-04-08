import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../state/search.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NodeComponent } from '../node/node.component';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, SearchBarComponent, NodeComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  store = inject(SearchStore);
}
