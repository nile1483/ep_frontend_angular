import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from 'src/express.tokens';
import { Response } from 'express';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StatusCodeResponseService {

  constructor(
        @Optional() @Inject(RESPONSE) private response: Response | null,
       private router: Router
  ) {
    
  }

  /**
   * Set a status code on the response for given status code and message.
   *
   * @param {number} code
   * @param {string} message
   */
  setStatus(code: number, message?: string) {
    if (!this.response) {
      return;
    }

    this.response.statusCode = code;

    if (message) {
      this.response.statusMessage = message;
    }
  }

  /**
   * Set a 404 Not Found status code on the response
   *
   * @param {string} message
   */
  setNotFound(message = 'Not Found') {
  /*   if (!this.response) {
      return;
    }

    this.response.statusCode = 404;
    this.response.statusMessage = message;

    this.response.setHeader('Content-Type', 'text/plain');
    this.response.end(message); */


    //  // throw artificial 404 error
    //         throw new HttpErrorResponse({
    //           error: event.body,
    //           status: 404,
    //           statusText: 'Not Found',
    //         });
          if (this.response) {
          this.response.status(404);
          this.response.statusMessage = message;
        }
            
  }

  setPermanentRedirect(newUrl: string) {
    if (newUrl.startsWith('http://') || newUrl.startsWith('https://')) {
      // External URL
      window.location.href = newUrl;
    } else {
      // Internal URL (relative path)
      this.router.navigate([newUrl]);
    }
  }

  /**
   * Set a 500 Internal Server Error status code on the response
   *
   * @param {string} message
   */
  setInternalServerError(message = 'Internal Server Error') {
    if (!this.response) {
      return;
    }

    this.response.statusCode = 500;
    this.response.statusMessage = message;
  }
}