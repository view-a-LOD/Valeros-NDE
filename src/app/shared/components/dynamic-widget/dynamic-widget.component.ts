import {
  Component,
  input,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { WidgetMapping } from '../../types/widget-config';
import { PropertyLabelWrapperComponent } from '../property-label-wrapper/property-label-wrapper.component';
import { NodeModel } from '../../../types/node/node.model';

@Component({
  selector: 'app-dynamic-widget',
  standalone: true,
  templateUrl: './dynamic-widget.component.html',
  imports: [PropertyLabelWrapperComponent],
})
export class DynamicWidgetComponent implements AfterViewInit {
  data = input.required<NodeModel>();
  property = input.required<string>();
  widget = input.required<WidgetMapping>();

  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer!: ViewContainerRef;

  ngAfterViewInit() {
    const widget = this.widget();
    const componentRef = this.widgetContainer.createComponent(widget.component);
    componentRef.setInput('node', this.data());
    componentRef.setInput('property', this.property());
    componentRef.setInput('config', widget.config);
  }
}
