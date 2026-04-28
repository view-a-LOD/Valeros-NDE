import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { isNodeModel, NodeModel } from '../../../../node/types/node.model';
import { TextWidgetConfig } from '../text-widget/text-widget.config';
import { BadgeWidget } from '../badge-widget/badge-widget.component';
import { TextWidget } from '../text-widget/text-widget.component';

@Component({
  selector: 'app-link-or-literal-widget',
  imports: [CommonModule, BadgeWidget, TextWidget],
  templateUrl: './link-or-literal-widget.component.html',
})
export class LinkOrLiteralWidget extends BaseWidget {
  nodeValues = computed(() => {
    return this.values().filter((value) => isNodeModel(value));
  });

  literalValues = computed(() => {
    return this.values().filter((value) => !isNodeModel(value));
  });

  nodeWithNodeValues = computed<NodeModel>(() => ({
    id: 'node-values',
    nodes: this.nodeValues(),
  }));

  nodeWithLiteralValues = computed<NodeModel>(() => ({
    id: 'literal-values',
    literals: this.literalValues(),
  }));

  textConfig = computed(() => ({
    showPropertyLabel: false,
    asHeader: (this.config() as TextWidgetConfig).asHeader,
    largeFont: (this.config() as TextWidgetConfig).largeFont,
    maxLength: (this.config() as TextWidgetConfig).maxLength,
    enableHighlights: (this.config() as TextWidgetConfig).enableHighlights,
  }));
}
