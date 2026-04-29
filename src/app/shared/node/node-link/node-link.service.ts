import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { NodeModel } from '../types/node.model';

@Injectable({
  providedIn: 'root',
})
export class NodeLinkService {
  private apiService = inject(ApiService);

  isInternalLink(node: NodeModel): boolean {
    return node.id.startsWith(this.apiService.apiBaseUrl);
  }
}
