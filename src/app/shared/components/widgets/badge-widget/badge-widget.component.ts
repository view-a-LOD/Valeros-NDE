import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { NodeLinkComponent } from '../../node-link/node-link.component';
import { isNodeModel } from '../../../types/node/node.guards';

@Component({
  selector: 'app-badge-widget',

  imports: [CommonModule, NodeLinkComponent],
  templateUrl: './badge-widget.component.html',
})
export class BadgeWidget extends BaseWidget {
  protected readonly isNodeModel = isNodeModel;
}
