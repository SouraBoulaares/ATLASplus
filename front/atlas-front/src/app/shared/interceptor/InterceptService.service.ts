import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable()
export class InterceptService implements HttpInterceptor {

   constructor(private router: Router){}
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // if (request.url.indexOf("assets") == -1) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });
    // }
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          // http response status code
          if (error.status === 401||error.status === 403){
            localStorage.clear();
            this.router.navigateByUrl('/auth/login');
          }
        
        }
      )
    );
  }

 }
