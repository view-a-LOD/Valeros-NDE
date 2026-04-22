import { Directive, input, computed } from '@angular/core';
import { normalizeToArray } from '../../../shared/utils/value-normalization.util';
import { BaseWidgetConfig } from '../types/widget-config';
import { applyPropertyPath } from '../../../shared/utils/property-path.util';
import { NodeModel } from '../../../core/models/node/node.model'

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
