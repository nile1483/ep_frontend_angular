import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  moduleName = 'Team';
  teamExcellentList = AppURL.teamexcellent;
  teamAlbumList = AppURL.teamalbum;
  constructor(private http: HttpClient) { }


  getTeamExcellentList(): Observable<any> {

    const url = `${this.teamExcellentList}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Team list', { "status": false, "message": "Get Team list Error" }))
      );
  }

  getTeamAlbum(): Observable<any> {

    const url = `${this.teamAlbumList}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Team Album List', { "status": false, "message": "Get Team Album List Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };

  }

}
