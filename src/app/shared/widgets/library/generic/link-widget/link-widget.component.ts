import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { isNodeModel, NodeModel } from '../../../../node/types/node.model';
import { TextWidgetConfig } from '../text-widget/text-widget.config';
import { TextWidget } from '../text-widget/text-widget.component';
import { NodeLinkComponent } from '../../../../node/node-link/node-link.component';

@Component({
  selector: 'app-link-widget',
  imports: [CommonModule, TextWidget, NodeLinkComponent],
  templateUrl: './link-widget.component.html',
})
export class LinkWidget extends BaseWidget {
  nodeValues = computed(() => {
    return this.values().filter((value) => isNodeModel(value));
  });

  literalValues = computed(() => {
    return this.values().filter((value) => !isNodeModel(value));
  });

  nodeWithLiteralValues = computed<NodeModel>(() => ({
    id: 'literal-values',
    literals: this.literalValues(),
  }));

  typedConfig = computed(() => this.config() as TextWidgetConfig);

  textConfig = computed(() => ({
    showPropertyLabel: false,
    ...this.typedConfig,
  }));
}
