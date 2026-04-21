import { Component, input, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicWidgetComponent } from '../dynamic-widget/dynamic-widget.component';
import { WidgetService } from '../../services/widget.service';
import { NodeModel } from '../../types/node/node.model';
import { WidgetsByPosition } from '../../types/widgets-by-position';
import { NavigationState } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-node',
  imports: [CommonModule, DynamicWidgetComponent],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  standalone: true,
  host: {
    class: 'block',
  },
})
export class NodeComponent {
  data = input.required<NodeModel>();
  clickable = input<boolean>(true);

  private widgetService = inject(WidgetService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  widgetsByPosition: Signal<WidgetsByPosition> = computed(() =>
    this.widgetService.getWidgetsByPosition(Object.keys(this.data())),
  );

  detailsRoute = computed(() => {
    const id = this.data().id;
    return id ? ['/details'] : null;
  });

  detailsQueryParams = computed(() => {
    const id = this.data().id;
    return id ? { id } : null;
  });

  navigateToDetails(event: Event): void {
    event.preventDefault();
    const id = this.data().id;
    if (!id) return;

    const navigationState: NavigationState = {
      searchParams: this.route.snapshot.queryParams,
    };

    this.router.navigate(['/details'], {
      queryParams: { id },
      state: navigationState,
    });
  }
}
