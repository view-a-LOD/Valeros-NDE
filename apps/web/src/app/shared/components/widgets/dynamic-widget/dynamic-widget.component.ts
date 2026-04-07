import {
  Component,
  input,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  inject,
} from '@angular/core';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { WidgetService } from '../../../services/widget.service';

@Component({
  selector: 'app-dynamic-widget',
  standalone: true,
  templateUrl: './dynamic-widget.component.html',
})
export class DynamicWidgetComponent implements AfterViewInit {
  node = input.required<SearchNode>();
  propertyUri = input.required<string>();

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private widgetService = inject(WidgetService);

  ngAfterViewInit() {
    const mapping = this.widgetService.getWidgetForProperty(this.propertyUri());
    const componentRef = this.container.createComponent(mapping.component);
    componentRef.setInput('node', this.node());
    componentRef.setInput('propertyUri', this.propertyUri());
    componentRef.setInput('config', mapping.config);
  }
}
