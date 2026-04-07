import { Directive, input, computed } from '@angular/core';
import { SearchNode, SearchValueObject } from '@valeros-ldkit/shared-types';

@Directive()
export abstract class BaseWidget {
  node = input.required<SearchNode>();
  propertyUri = input.required<string>();
  config = input<Record<string, unknown>>({});

  values = computed<SearchValueObject[]>(() => {
    const propValue = this.node()[this.propertyUri()];

    if (!propValue) return [];

    if (Array.isArray(propValue)) {
      return propValue as SearchValueObject[];
    }

    return [propValue as SearchValueObject];
  });

  protected getFirstValue(): SearchValueObject | undefined {
    return this.values()[0];
  }

  protected getHighlightedFirstValue(): string | null {
    const first = this.getFirstValue();
    if (!first) return null;
    return first.highlight || this.extractStringValue(first);
  }

  protected extractStringValue(valueObj: SearchValueObject): string | null {
    const value = valueObj['@value'];
    if (!value) return null;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }
}
