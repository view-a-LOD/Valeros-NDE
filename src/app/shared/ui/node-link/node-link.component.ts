import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NodeModel } from '../../../core/models/node/node.model'
import { normalizeToFirst } from '../../utils/value-normalization.util';

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
