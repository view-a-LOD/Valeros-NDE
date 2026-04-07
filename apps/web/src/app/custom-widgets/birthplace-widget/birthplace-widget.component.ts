import { Component, computed } from '@angular/core';
import { MapWidget } from '../../shared/components/widgets/map-widget/map-widget.component';
import { BaseWidget } from '../../shared/components/widgets/base-widget';
import { TextWidget } from '../../shared/components/widgets/text-widget/text-widget.component';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { PropertyLabelWrapperComponent } from "../../shared/components/property-label-wrapper/property-label-wrapper.component";

@Component({
  selector: 'app-birthplace-widget',
  standalone: true,
  imports: [MapWidget, TextWidget, PropertyLabelWrapperComponent],
  templateUrl: './birthplace-widget.component.html',
})
export class BirthplaceWidget extends BaseWidget {
  birthPlaceNode = computed<SearchNode | null>(() => {
    const firstValue = this.getFirstValue();
    if (!firstValue || typeof firstValue !== 'object') return null;
    return firstValue as SearchNode;
  });
}
