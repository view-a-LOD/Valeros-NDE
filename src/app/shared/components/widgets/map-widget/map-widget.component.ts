import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseWidget } from '../base-widget';
import * as L from 'leaflet';
import { normalizeToFirst } from '../../../utils/value-normalization.util';

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
  standalone: true,
  imports: [],
  templateUrl: './map-widget.component.html',
})
export class MapWidget extends BaseWidget implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coordinates: GeoCoordinates | undefined =
      normalizeToFirst<GeoCoordinates>(this.values());
    if (!coordinates) {
      console.warn('No coordinates found, skipping map initialization');
      return;
    }

    const { latitude: lat, longitude: lng } = coordinates;
    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);
  }
}
