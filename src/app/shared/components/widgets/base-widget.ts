import { Directive, input, computed } from '@angular/core';
import { BaseWidgetConfig } from '../../types/widget-config';
import {
  applyPropertyPath,
  normalizeToArray,
} from '../../utils/property-path.util';
import { NodeModel } from '../../types/node/node.model';

@Directive()
export abstract class BaseWidget {
  node = input.required<NodeModel>();
  property = input.required<string>();
  config = input<BaseWidgetConfig & Record<string, unknown>>({});

  showPropertyLabel = computed(() => {
    return this.config().showPropertyLabel !== false;
  });

  propertyLabel = computed(() => {
    return this.config().propertyLabel;
  });

  values = computed<any[]>(() => {
    const propValue = this.node()[this.property()];
    const propValues = normalizeToArray(propValue);

    const propertyPath = this.config().propertyPath;
    if (propertyPath) {
      return applyPropertyPath(propValues, propertyPath) as any[];
    }

    return propValues;
  });
}
