import {
  Component,
  Type,
  inject,
  signal,
  effect,
  viewChild,
  ViewContainerRef,
  ComponentRef,
  DestroyRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../../api/api.service';
import { getNestedValue } from '../../../data-utils/property-path.util';
import { BaseWidgetConfig } from '../../types/widget-config';
import { BaseWidget } from '../base-widget';
import { isAsyncPreviewConfig } from './async-preview-config';
import { NodeModel, isNodeModel } from '../../../node/types/node.model';

interface PreviewItem {
  id: string;
  data?: NodeModel;
  loading: boolean;
  error?: string;
}

@Component({
  selector: 'app-async-preview-widget',
  imports: [CommonModule],
  templateUrl: './async-preview-widget.component.html',
})
export class AsyncPreviewWidget extends BaseWidget {
  private readonly apiService = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  previewContainer = viewChild.required('previewContainer', {
    read: ViewContainerRef,
  });

  protected readonly previewItems = signal<PreviewItem[]>([]);
  private componentRefs: ComponentRef<BaseWidget>[] = [];

  protected readonly hasItems = computed(() => this.previewItems().length > 0);
  protected readonly isLoading = computed(() =>
    this.previewItems().some((item) => item.loading),
  );
  protected readonly hasError = computed(() =>
    this.previewItems().some((item) => item.error),
  );

  constructor() {
    super();

    effect(() => {
      const values = this.values();
      this.loadPreviews(values);
    });
  }

  private loadPreviews(values: any[]): void {
    const config = this.config();

    if (!isAsyncPreviewConfig(config)) {
      console.error('AsyncPreviewWidget config is invalid');
      this.previewItems.set([]);
      return;
    }

    const idPath = config.idPath || 'id';

    // Extract IDs from values, used to fetch preview data from API
    const items: PreviewItem[] = values
      .filter((value) => isNodeModel(value))
      .map((value) => {
        const id = this.extractId(value, idPath);
        return {
          id,
          loading: true,
        };
      })
      .filter((item) => item.id);

    if (items.length === 0) {
      this.previewItems.set([]);
      return;
    }

    this.previewItems.set(items);

    // Fetch preview data for each item from API
    const requests = items.map((item) =>
      this.apiService.details(item.id).pipe(
        catchError((error) => {
          console.error(`Failed to load preview for ${item.id}:`, error);
          return of(null);
        }),
      ),
    );

    forkJoin(requests).subscribe((results) => {
      const updatedItems = items.map((item, index) => {
        const data = results[index];
        return {
          ...item,
          data: data || undefined,
          loading: false,
          error: data ? undefined : 'Failed to load preview',
        };
      });

      this.previewItems.set(updatedItems);
      this.renderPreviews();
    });
  }

  private extractId(value: any, path: string): string {
    const result = getNestedValue(value, path);
    return typeof result === 'string' ? result : '';
  }

  private renderPreviews(): void {
    this.clearPreviews();

    const config = this.config();

    if (!isAsyncPreviewConfig(config)) {
      console.error('AsyncPreviewWidget config is invalid');
      return;
    }

    const container = this.previewContainer();

    this.previewItems().forEach((item) => {
      if (!item.data) return;

      const componentRef = container.createComponent(config.previewComponent);

      const previewConfig: BaseWidgetConfig = {
        showPropertyLabel: false,
        propertyPath: config.previewPropertyPath,
      };

      componentRef.setInput('node', item.data);
      componentRef.setInput('property', config.previewProperty);
      componentRef.setInput('config', previewConfig);

      this.componentRefs.push(componentRef);
    });

    this.destroyRef.onDestroy(() => {
      this.clearPreviews();
    });
  }

  private clearPreviews(): void {
    this.componentRefs.forEach((ref) => ref.destroy());
    this.componentRefs = [];
    this.previewContainer()?.clear();
  }
}
