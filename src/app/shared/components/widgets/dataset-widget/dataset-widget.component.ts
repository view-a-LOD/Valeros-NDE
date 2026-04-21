import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';

interface IsPartOfValue {
  id: string;
  type: string;
  name: string;
  publisher?: {
    id: string;
    type: string;
    name: string;
  };
  license?: {
    id: string;
    type: string;
    name: string;
  };
}

interface Dataset extends IsPartOfValue {
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
