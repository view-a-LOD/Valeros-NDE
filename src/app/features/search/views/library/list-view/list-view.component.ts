import { Component } from '@angular/core';
import { BaseResultsView } from '../../infrastructure/base-results-view';
import { NodeComponent } from '../../../../../shared/node/node.component';

@Component({
  selector: 'app-list-view',
  imports: [NodeComponent],
  templateUrl: './list-view.component.html',
})
export class ListViewComponent extends BaseResultsView {}
