import { Component } from '@angular/core';
import { BaseResultsView } from '../../infrastructure/base-results-view';
import { NodeComponent } from '../../../../../shared/node/node.component';

@Component({
  selector: 'app-masonry-view',
  imports: [NodeComponent],
  templateUrl: './masonry-view.component.html',
})
export class MasonryViewComponent extends BaseResultsView {}
