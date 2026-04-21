import { Component, input, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DynamicWidgetComponent } from '../dynamic-widget/dynamic-widget.component';
import { WidgetService } from '../../services/widget.service';
import { NodeModel } from '../../types/node/node.model';
import { WidgetsByPosition } from '../../types/widgets-by-position';

@Component({
  selector: 'app-node',
  imports: [CommonModule, DynamicWidgetComponent, RouterLink],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  standalone: true,
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
