import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PointsLayerService} from '../points-layer/points-layer.service';
import {Entity} from '../../models/entity.model';
import {Observable} from 'rxjs';
import {TimeStamp} from '../../models/time-stamp.model';
import {map, tap, timestamp} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private url = 'http://localhost:3000';
  private entityEntry = 'entities';

  constructor(
    private http: HttpClient
  ) {
  }

  refresh(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.url}/${this.entityEntry}/all`).pipe(
      timestamp(),
      tap(data => this.postArrivalTime(data.timestamp)),
      map(data => data.value)
    );
  }

  postFinishTime(timeStamp: TimeStamp) {
    console.log(JSON.stringify(timeStamp));
    this.http.post<TimeStamp>(
      `${this.url}/${this.entityEntry}/time`,
      JSON.stringify(timeStamp),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe();
  }

  private postArrivalTime(timeStamp: number) {
    this.http.post<number>(
      `${this.url}/${this.entityEntry}/arrival`,
      JSON.stringify({timeStamp}),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')},
      ).subscribe();
  }
}
