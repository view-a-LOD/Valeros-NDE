import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsPartOfNode } from '../../../../../core/models/node/is-part-of.node';
import { BaseWidget } from '../../../infrastructure/base-widget';

interface Dataset extends IsPartOfNode {
  type: 'Dataset';
}

@Component({
  selector: 'app-dataset-widget',

  imports: [CommonModule],
  templateUrl: './dataset-widget.component.html',
})
export class DatasetWidget extends BaseWidget {
  datasets: Signal<Dataset[]> = computed<Dataset[]>(() => {
    return this.values().filter(
      (value): value is Dataset => value?.type === 'Dataset',
    );
  });
}
