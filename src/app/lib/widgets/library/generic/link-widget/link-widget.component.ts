import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeLinkComponent } from '../../../../../shared/ui/node-link/node-link.component';
import { BaseWidget } from '../../../infrastructure/base-widget';

@Component({
  selector: 'app-link-widget',

  imports: [CommonModule, NodeLinkComponent],
  templateUrl: './link-widget.component.html',
})
export class LinkWidget extends BaseWidget {}
