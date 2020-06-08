import {Injectable} from '@angular/core';
import {MapService as MapService} from '../map/map.service';
import Point from 'esri/geometry/Point';
import Graphic from 'esri/Graphic';
import {SimpleMarkerSymbol} from 'esri/symbols';
import {Entity} from '../../models/entity.model';
import {ServerService} from '../server/server.service';
import {bindCallback} from 'rxjs';

import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class PointsLayerService {

  constructor(
    private mapService: MapService,
    private server: ServerService) {
    this.mapService.mapView$.subscribe(mapView =>
      mapView.graphics.on('after-add', event =>
        this.postFinishTIme(event.item.attributes.id, Date.now())));
  }

  private static getPoint(longitude, latitude) {
    return new Point({longitude, latitude});
  }

  private static getSimpleMarkerSymbol() {
    return new SimpleMarkerSymbol({
      color: [226, 119, 40],  // orange
      outline: {
        color: [255, 255, 255], // white
        width: 1
      }
    });
  }

  public addPoints(points: esri.Graphic[]) {
    this.mapService.mapView$.subscribe(mapView => mapView.graphics.addMany(points));
  }

  public entitiesToGraphics(entities: Entity[]): esri.Graphic[] {
    return entities.map(entity => new Graphic({
      geometry: PointsLayerService.getPoint(entity.longitude, entity.latitude),
      symbol: PointsLayerService.getSimpleMarkerSymbol(),
      attributes: {id: entity.id}
    }));
  }

  public cleanLayer() {
    this.mapService.mapView$.subscribe(mapView => mapView.graphics.removeAll());
  }

  public postFinishTIme(id: string, finishTime: number) {
    this.server.postFinishTime({id, timeStamp: finishTime});
  }
}
