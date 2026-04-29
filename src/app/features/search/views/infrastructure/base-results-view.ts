import { Directive, input } from '@angular/core';
import { NodeModel } from '../../../../shared/node/types/node.model';
import { BaseViewConfig } from '../types/view-config';

@Directive()
export abstract class BaseResultsView {
  results = input.required<NodeModel[]>();
  totalResults = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  config = input<BaseViewConfig>({});
}
