import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { NodeModel } from '../../../types/node/node.model';
import { NodeLinkComponent } from '../../node-link/node-link.component';

@Component({
  selector: 'app-link-widget',

  imports: [CommonModule, NodeLinkComponent],
  templateUrl: './link-widget.component.html',
})
export class LinkWidget extends BaseWidget {}
