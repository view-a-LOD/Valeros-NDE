import { Directive, input, computed } from '@angular/core';
import { SearchNode, SearchValueObject } from '@valeros-ldkit/shared-types';
import { BaseWidgetConfig } from '../../types/widget-config';

@Directive()
export abstract class BaseWidget {
  node = input.required<SearchNode>();
  property = input.required<string>();
  config = input<BaseWidgetConfig & Record<string, unknown>>({});

  showPropertyLabel = computed(() => {
    return this.config().showPropertyLabel !== false;
  });

  values = computed<SearchValueObject[]>(() => {
    const propValue = this.node()[this.property()];

    if (!propValue) return [];

    if (Array.isArray(propValue)) {
      return propValue as SearchValueObject[];
    }

    return [propValue as SearchValueObject];
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
