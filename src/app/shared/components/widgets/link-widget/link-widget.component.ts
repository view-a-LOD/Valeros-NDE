import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseWidget } from '../base-widget';
import { NodeModel } from '../../../types/node/node.model';
import { normalizeToFirst } from '../../../utils/value-normalization.util';

@Component({
  selector: 'app-link-widget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './link-widget.component.html',
})
export class LinkWidget extends BaseWidget {
  get nodes(): NodeModel[] {
    return this.values() as NodeModel[];
  }

  getNodeName(node: NodeModel): string {
    return normalizeToFirst<string>(node.name) || node.id;
  }

  getNodeType(node: NodeModel): string | undefined {
    return normalizeToFirst<string>(node.type);
  }

  getEncodedId(node: NodeModel): string {
    return encodeURIComponent(node.id);
  }
}
