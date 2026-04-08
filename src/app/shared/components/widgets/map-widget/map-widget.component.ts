import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseWidget } from '../base-widget';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
L.Marker.prototype.options.icon = iconDefault;

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
    // TODO: Retrieve coordinates from data
    const lat = 52.0907;
    const lng = 5.1214;

    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);
  }
}
