import { Component, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { normalizeToFirst } from '../../../../data-utils/value-normalization.util';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { isNodeModel } from '../../../../node/types/node.model';

const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
L.Marker.prototype.options.icon = iconDefault;

type GeoCoordinates = {
  latitude: number;
  longitude: number;
  type: 'GeoCoordinates';
};

@Component({
  selector: 'app-map-widget',

  imports: [],
  templateUrl: './map-widget.component.html',
})
export class MapWidget extends BaseWidget implements AfterViewInit {
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coordinates = this.extractCoordinates();
    if (!coordinates) {
      console.warn('No coordinates found, skipping map initialization');
      return;
    }

    const { latitude: lat, longitude: lng } = coordinates;
    this.map = L.map(this.mapContainer().nativeElement).setView([lat, lng], 13);

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}',
      {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png',
      } as any,
    ).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);
  }

  private extractCoordinates(): GeoCoordinates | undefined {
    const values = this.values();

    for (const value of values) {
      if (isNodeModel(value)) {
        const geoValue = value['geo'];
        if (geoValue) {
          const coordinates = normalizeToFirst<GeoCoordinates>(geoValue);
          if (coordinates && coordinates.type === 'GeoCoordinates') {
            return coordinates;
          }
        }
      } else if (
        value &&
        typeof value === 'object' &&
        value.type === 'GeoCoordinates'
      ) {
        return value as GeoCoordinates;
      }
    }

    return undefined;
  }
}
