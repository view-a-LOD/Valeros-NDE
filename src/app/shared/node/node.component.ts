import { Component, input, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WidgetService } from '../widgets/infrastructure/widget.service';
import { DynamicWidgetComponent } from '../widgets/infrastructure/dynamic-widget/dynamic-widget.component';
import { WidgetsByPosition } from '../widgets/types/widgets-by-position';
import { WidgetsSettings } from '../widgets/types/widget-config';
import { NodeModel } from './types/node.model';

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
  widgetsSettings = input.required<WidgetsSettings>();

  private widgetService = inject(WidgetService);

  widgetsByPosition: Signal<WidgetsByPosition> = computed(() => {
    const properties = Object.keys(this.data());
    const widgetsSettings = this.widgetsSettings();
    return this.widgetService.getWidgetsByPosition(properties, widgetsSettings);
  });

  detailsRoute = computed(() => {
    const id = this.data().id;
    return id ? ['/details'] : null;
  });

  detailsQueryParams = computed(() => {
    const id = this.data().id;
    return id ? { id } : null;
  });
}
