import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { LoadingService } from "../services/loading/loading-service";

export const HTTPInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(request).pipe(
    //delay(4000), // simulate a network delay of time
    catchError((error: HttpErrorResponse) => throwError(() => error)),
    finalize(() => {
      loadingService.hide();
    }),
  );
};
