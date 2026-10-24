import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class TestimonialsService {

  moduleName = 'Testimonials';
  testimonialsList = AppURL.testimonialslist;
  constructor(private http: HttpClient) { }


  getTestimonialsList(): Observable<any> {

    const url = `${this.testimonialsList}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Testimonials list', { "status": false, "message": "Get Testimonials list Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };

  }

}
