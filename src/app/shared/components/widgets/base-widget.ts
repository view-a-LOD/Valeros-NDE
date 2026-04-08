import { Directive, input, computed } from '@angular/core';
import { BaseWidgetConfig } from '../../types/widget-config';
import {
  normalizeToArray,
  applyPropertyPath,
} from '../../utils/property-path.util';
import { SearchNode } from '../../../types/search-node';
import { SearchValueObject } from '../../../types/search-value-object';

@Directive()
export abstract class BaseWidget {
  node = input.required<SearchNode>();
  property = input.required<string>();
  config = input<BaseWidgetConfig & Record<string, unknown>>({});

  showPropertyLabel = computed(() => {
    return this.config().showPropertyLabel !== false;
  });

  propertyLabel = computed(() => {
    return this.config().propertyLabel;
  });

  values = computed<SearchValueObject[]>(() => {
    const propValues: SearchValueObject[] = normalizeToArray(
      this.node()[this.property()] as SearchValueObject | SearchValueObject[],
    );

    if (!propValues) return [];

    const propertyPath = this.config().propertyPath;
    if (propertyPath) {
      return applyPropertyPath(propValues, propertyPath) as SearchValueObject[];
    }

    return propValues;
  });

  protected getHighlightedValues(): string[] {
    return this.values()
      .map((v) => v.highlight || this.extractStringValue(v))
      .filter((v): v is string => v !== null);
  }

  protected extractStringValue(valueObj: SearchValueObject): string | null {
    const value = valueObj['@value'];
    if (!value) return null;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}
