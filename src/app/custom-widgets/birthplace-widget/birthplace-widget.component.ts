import { Component, computed } from '@angular/core';
import { MapWidget } from '../../shared/components/widgets/map-widget/map-widget.component';
import { BaseWidget } from '../../shared/components/widgets/base-widget';
import { TextWidget } from '../../shared/components/widgets/text-widget/text-widget.component';
import { PropertyLabelWrapperComponent } from '../../shared/components/property-label-wrapper/property-label-wrapper.component';
import { NodeModel } from '../../shared/types/node/node.model';

@Component({
  selector: 'app-birthplace-widget',
  standalone: true,
  imports: [MapWidget, TextWidget, PropertyLabelWrapperComponent],
  templateUrl: './birthplace-widget.component.html',
})
export class BirthplaceWidget extends BaseWidget {
  birthPlaceNodes = computed<NodeModel[]>(() => {
    return this.values()
      .filter((v) => v && typeof v === 'object')
      .map((v) => v as NodeModel);
  });
}
