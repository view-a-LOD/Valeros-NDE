import { Component, computed } from '@angular/core';
import { NodeModel } from '../../../../../core/models/node/node.model';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { PropertyLabelWrapperComponent } from '../../../infrastructure/property-label-wrapper/property-label-wrapper.component';
import { MapWidget } from '../../generic/map-widget/map-widget.component';
import { TextWidget } from '../../generic/text-widget/text-widget.component';

@Component({
  selector: 'app-birthplace-widget',

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
