import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogUrl = AppURL.blogUrl;
  blogCategoryUrl = AppURL.blogCategoryUrl;

  newsUrl = AppURL.newsUrl;
  newsCategoryUrl = AppURL.newsCategoryUrl;

  casestudyUrl = AppURL.casestudyUrl;
  casestudyCategoryUrl = AppURL.casestudyCategoryUrl;

  constructor(private http: HttpClient) { }

  getBlogList(linkName: string, params: any): Observable<any> {

    let type = 'Blog'; // Default value

    let options = encodeURIComponent(JSON.stringify(params));
    let url = `${this.blogUrl}?params=${options}`; // Default value

    if (linkName === 'news') {
      type = 'News';
      url = `${this.newsUrl}?params=${options}`;
    } else if (linkName === 'casestudy') {
      type = 'Casestudy';
      url = `${this.casestudyUrl}?params=${options}`;
    }

    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(type + ' List', { "status": false, "message": type + " List Error" }))
      );
  }


  getBlogListByAuthor(linkName: string, params: any): Observable<any> {

    let type = 'Blog'; // Default value

    let options = encodeURIComponent(JSON.stringify(params));
    let url = `${this.blogUrl}/author?params=${options}`; // Default value

    if (linkName === 'news') {
      type = 'News';
      url = `${this.newsUrl}/author?params=${options}`;
    } else if (linkName === 'casestudy') {
      type = 'Casestudy';
      url = `${this.casestudyUrl}/author?params=${options}`;
    }

    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(type + ' List', { "status": false, "message": type + " List Error" }))
      );
  }


  getBlogCategoryList(linkName: string): Observable<any> {

    let type = 'Blog'; // Default value
    let url = this.blogCategoryUrl; // Default value

    if (linkName === 'news') {
      type = 'News';
      url = this.newsCategoryUrl;
    } else if (linkName === 'casestudy') {
      type = 'Casestudy';
      url = this.casestudyCategoryUrl;
    }

    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(type + ' Category List', { "status": false, "message": type + " Category List Error" }))
      );
  }


  getBlogDetail(linkName: string, alias: string): Observable<any> {

    let type = 'Blog'; // Default value
    let url = `${this.blogUrl}/${alias}`; // Default value

    if (linkName === 'news') {
      type = 'News';
      url = `${this.newsUrl}/${alias}`
    } else if (linkName === 'casestudy') {
      type = 'Casestudy';
      url = `${this.casestudyUrl}/${alias}`
    }

    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(type + ' Detail', { "status": false, "message": type + " Detail Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      if (error.status == 401) {
        let responce: any = {};
        responce.status = false;
        responce.statusCode = 401;
        responce.message = error.error.message;
        return of(responce as T);
      }

      return of(result as T);
    };

  }

}
