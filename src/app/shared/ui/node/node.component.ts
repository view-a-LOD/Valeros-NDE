import { Component, input, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WidgetService } from '../../services/widget.service';
import { DynamicWidgetComponent } from '../../../lib/widgets/infrastructure/dynamic-widget/dynamic-widget.component';
import { WidgetsByPosition } from '../../../lib/widgets/types/widgets-by-position';
import { NodeModel } from '../../../core/models/node/node.model'

@Component({
  selector: 'app-node',
  imports: [CommonModule, DynamicWidgetComponent, RouterLink],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',

  host: {
    class: 'block',
  },
})
export class NodeComponent {
  data = input.required<NodeModel>();
  clickable = input<boolean>(true);

  private widgetService = inject(WidgetService);

  widgetsByPosition: Signal<WidgetsByPosition> = computed(() =>
    this.widgetService.getWidgetsByPosition(Object.keys(this.data())),
  );

  detailsRoute = computed(() => {
    const id = this.data().id;
    return id ? ['/details'] : null;
  });

  detailsQueryParams = computed(() => {
    const id = this.data().id;
    return id ? { id } : null;
  });
}
