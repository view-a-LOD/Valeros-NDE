import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { normalizeToFirst } from '../../data-utils/value-normalization.util';
import { NodeModel } from '../types/node.model';
import { NodeLinkService } from './node-link.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherExternalLink } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-node-link',
  imports: [RouterModule, NgTemplateOutlet, NgIcon],
  templateUrl: './node-link.component.html',
  styleUrl: './node-link.component.scss',
  viewProviders: [provideIcons({ featherExternalLink })],
})
export class NodeLinkComponent {
  readonly node = input.required<NodeModel>();
  readonly showType = input<boolean>(true);

  private nodeLinkService = inject(NodeLinkService);

  readonly isInternalLink = computed(() => {
    return this.nodeLinkService.isInternalLink(this.node());
  });

  getNodeName(node: NodeModel): string {
    return normalizeToFirst<string>(node.name) || node.id;
  }

  getNodeType(node: NodeModel): string | undefined {
    return normalizeToFirst<string>(node.type);
  }
}
