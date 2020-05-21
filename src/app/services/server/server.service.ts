import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PointsLayerService} from '../points-layer/points-layer.service';
import {Entity} from '../../models/entity.model';
import {Observable} from 'rxjs';
import {TimeStamp} from '../../models/time-stamp.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private url = 'http://localhost:3000';
  private entityEntry = 'entities';

  constructor(
    private http: HttpClient
  ) { }

  refresh(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.url}/${this.entityEntry}/all`);
  }

  postFinishTime(timeStamp: TimeStamp) {
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log(JSON.stringify(timeStamp));
    this.http.post<TimeStamp>(
      `${this.url}/${this.entityEntry}/time`,
      JSON.stringify(timeStamp),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe();
  }
}
