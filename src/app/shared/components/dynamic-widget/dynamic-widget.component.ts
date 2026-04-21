import {
  Component,
  input,
  viewChild,
  ViewContainerRef,
  AfterViewInit,
  effect,
  DestroyRef,
  ComponentRef,
  inject,
} from '@angular/core';
import { WidgetMapping } from '../../types/widget-config';
import { PropertyLabelWrapperComponent } from '../property-label-wrapper/property-label-wrapper.component';
import { NodeModel } from '../../types/node/node.model';
import { BaseWidget } from '../widgets/base-widget';

@Component({
  selector: 'app-dynamic-widget',

  templateUrl: './dynamic-widget.component.html',
  imports: [PropertyLabelWrapperComponent],
})
export class DynamicWidgetComponent implements AfterViewInit {
  data = input.required<NodeModel>();
  property = input.required<string>();
  widget = input.required<WidgetMapping>();

  widgetContainer = viewChild.required('widgetContainer', {
    read: ViewContainerRef,
  });

  private componentRef?: ComponentRef<BaseWidget>;
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.data();
      this.property();
      this.widget();
      this.recreateWidget();
    });
  }

  ngAfterViewInit() {
    this.createWidget();
  }

  private createWidget() {
    const widget = this.widget();
    this.componentRef = this.widgetContainer().createComponent(
      widget.component,
    );
    this.componentRef.setInput('node', this.data());
    this.componentRef.setInput('property', this.property());
    this.componentRef.setInput('config', widget.config);

    this.destroyRef.onDestroy(() => {
      this.componentRef?.destroy();
    });
  }

  private recreateWidget() {
    if (!this.componentRef) return;

    this.componentRef.destroy();
    this.widgetContainer().clear();
    this.createWidget();
  }
}
