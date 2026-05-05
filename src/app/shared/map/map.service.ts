import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { getNestedValue } from '../data-utils/property-path.util';
import { normalizeToArray } from '../data-utils/value-normalization.util';
import { isNodeModel, NodeModel } from '../node/types/node.model';
import { GeoCoordinates, isGeoCoordinates } from './geo-coordinates.model';

const defaultCircleMarkerOptions: L.CircleMarkerOptions = {
  radius: 8,
  fillColor: '#00839F',
  color: '#ffffff',
  weight: 2,
  opacity: 1,
  fillOpacity: 1,
};

@Injectable({ providedIn: 'root' })
export class MapService {
  extractCoordinatesFromNode(
    node: NodeModel,
    propertyPaths?: string[],
  ): GeoCoordinates[] {
    const coordinates: GeoCoordinates[] = [];

    const geo = node['geo'];
    if (geo && isGeoCoordinates(geo)) {
      coordinates.push(geo);
    }

    if (propertyPaths && propertyPaths.length > 0) {
      for (const path of propertyPaths) {
        const value = getNestedValue(node, path);
        const values = normalizeToArray(value);

        for (const item of values) {
          if (isNodeModel(item)) {
            const nestedCoords = this.extractCoordinatesFromNode(
              item,
              propertyPaths,
            );
            coordinates.push(...nestedCoords);
          }
        }
      }
    }

    return coordinates;
  }

  extractCoordinatesFromNodes(
    nodes: NodeModel[],
    propertyPaths?: string[],
  ): GeoCoordinates[] {
    return nodes.flatMap((node) =>
      this.extractCoordinatesFromNode(node, propertyPaths),
    );
  }

  createMap(
    container: HTMLElement,
    center: [number, number],
    zoom: number = 13,
  ): L.Map {
    const map = L.map(container).setView(center, zoom);

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}',
      {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png',
      } as any,
    ).addTo(map);

    return map;
  }

  addMarkersAndFitBounds(
    map: L.Map,
    coordinates: GeoCoordinates[],
    popupContent?: (coord: GeoCoordinates) => HTMLElement | string,
    popupOptions?: L.PopupOptions,
  ): L.CircleMarker[] {
    const markers: L.CircleMarker[] = [];

    coordinates.forEach((coord) => {
      const marker = L.circleMarker(
        [coord.latitude, coord.longitude],
        defaultCircleMarkerOptions,
      ).addTo(map);

      if (popupContent) {
        marker.bindPopup(popupContent(coord), popupOptions);
      }

      markers.push(marker);
    });

    if (markers.length > 1) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return markers;
  }
}
