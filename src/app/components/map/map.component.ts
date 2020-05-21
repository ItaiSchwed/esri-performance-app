import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MapService} from '../../services/map/map.service';
import {PointsLayerService} from '../../services/points-layer/points-layer.service';
import {ServerService} from '../../services/server/server.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapViewNode', {static: true}) private mapViewEl: ElementRef;

  constructor(
    private mapService: MapService,
    private server: ServerService,
    private pointsLayer: PointsLayerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapService.initMap(this.mapViewEl);
  }

  ngOnDestroy() {
    this.mapService.destroyMap();
  }

  refresh() {
    this.pointsLayer.cleanLayer();
    this.server.refresh().subscribe(entities => {
      entities.forEach(entity => this.pointsLayer.addPoint(entity));
    });
  }
}
