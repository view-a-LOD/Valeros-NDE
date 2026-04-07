import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { PropertyLabelWrapperComponent } from '../../property-label-wrapper/property-label-wrapper.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-widget',
  standalone: true,
  imports: [PropertyLabelWrapperComponent],
  templateUrl: './map-widget.component.html',
})
export class MapWidget extends BaseWidget implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const lat = 52.0907;
    const lng = 5.1214;

    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);
  }
}
