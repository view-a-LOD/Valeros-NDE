import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { IsPartOfNode } from '../../../../node/types/is-part-of.node';
import { LinkOrLiteralWidget } from '../../generic/link-or-literal-widget/link-or-literal-widget.component';
import { NodeModel } from '../../../../node/types/node.model';

interface Dataset extends IsPartOfNode {
  type: 'Dataset';
}

@Component({
  selector: 'app-dataset-widget',

  imports: [CommonModule, LinkOrLiteralWidget],
  templateUrl: './dataset-widget.component.html',
})
export class DatasetWidget extends BaseWidget {
  datasets: Signal<Dataset[]> = computed<Dataset[]>(() => {
    return this.values().filter(
      (value): value is Dataset => value?.type === 'Dataset',
    );
  });

  nodeWithDatasets = computed<NodeModel>(() => ({
    id: 'datasets',
    datasets: this.datasets(),
  }));
}
