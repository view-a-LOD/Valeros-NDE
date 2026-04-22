import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { normalizeToFirst } from '../../data-utils/value-normalization.util';
import { NodeModel } from '../types/node.model';

@Component({
  selector: 'app-node-link',
  imports: [RouterModule],
  templateUrl: './node-link.component.html',
})
export class NodeLinkComponent {
  readonly node = input.required<NodeModel>();
  readonly showType = input<boolean>(true);

  getNodeName(node: NodeModel): string {
    return normalizeToFirst<string>(node.name) || node.id;
  }

  getNodeType(node: NodeModel): string | undefined {
    return normalizeToFirst<string>(node.type);
  }
}
