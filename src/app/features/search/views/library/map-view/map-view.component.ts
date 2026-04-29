import {
  Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  effect,
  ComponentRef,
  ViewContainerRef,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import * as L from 'leaflet';
import { BaseResultsView } from '../../infrastructure/base-results-view';
import { NodeComponent } from '../../../../../shared/node/node.component';
import { NodeModel } from '../../../../../shared/node/types/node.model';
import { MapService } from '../../../../../shared/map/map.service';
import { GeoCoordinates } from '../../../../../shared/map/geo-coordinates.model';

@Component({
  selector: 'app-map-view',
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent extends BaseResultsView implements AfterViewInit {
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;
  private markers: L.Marker[] = [];
  private mapService = inject(MapService);

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {
    super();

    effect(() => {
      const results = this.results();
      if (this.map) {
        this.updateMarkers(results);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.updateMarkers(this.results());
  }

  private initMap(): void {
    this.map = this.mapService.createMap(
      this.mapContainer().nativeElement,
      [52.0907, 5.1214],
      7,
    );
  }

  private updateMarkers(results: NodeModel[]): void {
    if (!this.map) return;

    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    const coordinatesWithNodes: Array<{
      coordinates: GeoCoordinates;
      node: NodeModel;
    }> = [];

    results.forEach((node: NodeModel) => {
      // TODO: Make properties used to find geo coordinates configurable
      const allCoordinatesForNode = this.mapService.extractCoordinatesFromNode(
        node,
        ['contentLocation', 'location'],
      );

      allCoordinatesForNode.forEach((coordinates) => {
        coordinatesWithNodes.push({ coordinates, node });
      });
    });

    const coordinates = coordinatesWithNodes.map((item) => item.coordinates);

    this.markers = this.mapService.addMarkersAndFitBounds(
      this.map,
      coordinates,
      (coords: GeoCoordinates) => {
        const item = coordinatesWithNodes.find(
          (item) =>
            item.coordinates.latitude === coords.latitude &&
            item.coordinates.longitude === coords.longitude,
        );
        return this.createPopupContent(item!.node);
      },
      {
        maxWidth: 320,
        minWidth: 280,
      },
    );
  }

  private createPopupContent(node: NodeModel): HTMLElement {
    const container = document.createElement('div');
    container.className = 'map-popup-content';

    const componentRef = createComponent(NodeComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.environmentInjector,
    });

    componentRef.setInput('data', node);
    componentRef.setInput('widgetsSettings', this.widgetsSettings());

    this.appRef.attachView(componentRef.hostView);
    container.appendChild(componentRef.location.nativeElement);

    return container;
  }
}
