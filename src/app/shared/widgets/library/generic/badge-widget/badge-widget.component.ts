import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeLinkComponent } from '../../../../ui/node-link/node-link.component';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { isNodeModel } from '../../../../../core/models/node/node.model';

@Component({
  selector: 'app-badge-widget',

  imports: [CommonModule, NodeLinkComponent],
  templateUrl: './badge-widget.component.html',
})
export class BadgeWidget extends BaseWidget {
  protected readonly isNodeModel = isNodeModel;
}
