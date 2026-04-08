import {
  Component,
  input,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  AfterViewInit,
  inject,
  computed,
} from '@angular/core';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { WidgetService } from '../../services/widget.service';
import { PropertyLabelWrapperComponent } from '../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-dynamic-widget',
  standalone: true,
  templateUrl: './dynamic-widget.component.html',
  imports: [PropertyLabelWrapperComponent],
})
export class DynamicWidgetComponent implements AfterViewInit {
  data = input.required<SearchNode>();
  property = input.required<string>();

  @ViewChildren('widgetContainer', { read: ViewContainerRef })
  widgetContainers!: QueryList<ViewContainerRef>;

  private widgetService = inject(WidgetService);

  widgets = computed(() => {
    return this.widgetService.getWidgetsForProperty(this.property());
  });

  ngAfterViewInit() {
    const containers = this.widgetContainers.toArray();
    const widgets = this.widgets();

    widgets.forEach((widget, index) => {
      const container = containers[index];
      if (container) {
        const componentRef = container.createComponent(widget.component);
        componentRef.setInput('node', this.data());
        componentRef.setInput('property', this.property());
        componentRef.setInput('config', widget.config);
      }
    });
  }
}
