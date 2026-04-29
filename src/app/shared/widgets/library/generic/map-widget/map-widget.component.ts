import {
  Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  inject,
  computed,
} from '@angular/core';
import * as L from 'leaflet';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { MapService } from '../../../../map/map.service';
import { isNodeModel, NodeModel } from '../../../../node/types/node.model';

@Component({
  selector: 'app-map-widget',
  imports: [],
  templateUrl: './map-widget.component.html',
})
export class MapWidget extends BaseWidget implements AfterViewInit {
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;
  private mapService = inject(MapService);

  nodes = computed<NodeModel[]>(() => {
    return this.values().filter((value): value is NodeModel =>
      isNodeModel(value),
    );
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coordinates = this.mapService.extractCoordinatesFromNodes(
      this.nodes(),
      [this.property()],
    );

    if (coordinates.length === 0) {
      console.warn('No coordinates found, skipping map initialization');
      return;
    }

    const firstCoord = coordinates[0];
    this.map = this.mapService.createMap(
      this.mapContainer().nativeElement,
      [firstCoord.latitude, firstCoord.longitude],
      13,
    );

    this.mapService.addMarkersAndFitBounds(this.map, coordinates);
  }
}
