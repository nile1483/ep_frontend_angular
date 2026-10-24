import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class CareerService {

  moduleName = 'Career';
  careerUrl = AppURL.career;

  constructor(private http: HttpClient) { }

  getCurrentMaster(): Observable<any> {
    const url = `${this.careerUrl}/careermaster`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Careers Master List', { "status": false, "message": "Get Career Master List Error" }))
      );
  }

  getCurrentOpenings(params: any): Observable<any> {
    const options = encodeURIComponent(JSON.stringify(params));
    const url = `${this.careerUrl}?params=${options}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Careers List', { "status": false, "message": "Get Careers List Error" }))
      );
  }

  getCareerDetail(slug: any): Observable<any> {
    const url = `${this.careerUrl}/${slug}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Career Details', { "status": false, "message": "Get Career Details Error" }))
      );
  }

  careerCreate(data: any): Observable<any> {
    const url = `${this.careerUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('career added', { "status": false, "message": "career error" }))
      );
  }

  careerFileUpload(data: any): Observable<any> {
    const url = `${this.careerUrl}/fileupload`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Career file upload', { "status": false, "message": "Career file upload error" }))
      );
  }

  getCareerQuestions(uuid: any): Observable<any> {
    const url = `${this.careerUrl}/questions/${uuid}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Career Questions', { "status": false, "message": "Get Career Questions Error" }))
      );
  }

  createQuestionAnswers(data: any): Observable<any> {
    const url = `${this.careerUrl}/questionanswers`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Career Question Answers', { "status": false, "message": "Career Question Answers error" }))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }

}
