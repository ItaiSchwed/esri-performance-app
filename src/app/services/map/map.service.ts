import { Injectable, ElementRef } from '@angular/core';
import Map from 'arcgis-js-api/Map';
import MapView from 'arcgis-js-api/views/MapView';

import esri = __esri;
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {}

  public map: esri.Map;
  public mapView$: Subject<esri.MapView> = new ReplaySubject<esri.MapView>(1);
  // tslint:disable-next-line:variable-name
  private _mapView: esri.MapView;

  private static getMapProperties(): esri.MapProperties {
    return {
      basemap: 'streets'
    };
  }

  public initMap(mapViewEl: ElementRef) {
    try {
      const mapProperties: esri.MapProperties = MapService.getMapProperties();
      this.map = new Map(mapProperties);
      const mapViewProperties: esri.MapViewProperties = this.getMapViewProperties(mapViewEl);
      this._mapView = new MapView(mapViewProperties);
      this._mapView.when(() => this.mapView$.next(this._mapView));
    } catch (error) {
      console.error('Esri: ', error);
    }
  }

  private getMapViewProperties(mapViewEl: ElementRef): esri.MapViewProperties {
    return {
      container: mapViewEl.nativeElement,
      center: [35.217018, 31.771959],
      zoom: 7,
      map: this.map
    };
  }

  destroyMap() {
    if (this._mapView) {
      this._mapView.container = null;
    }
  }
}
