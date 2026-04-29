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
  computed,
  Signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PropertyLabelWrapperComponent } from '../property-label-wrapper/property-label-wrapper.component';
import { WidgetMapping } from '../../types/widget-config';
import { BaseWidget } from '../base-widget';
import { NodeModel } from '../../../node/types/node.model';
import { LinkWidget } from '../../library/generic/link-widget/link-widget.component';
import { normalizeToArray } from '../../../data-utils/value-normalization.util';

@Component({
  selector: 'app-dynamic-widget',

  templateUrl: './dynamic-widget.component.html',
  imports: [PropertyLabelWrapperComponent, LinkWidget, NgTemplateOutlet],
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
