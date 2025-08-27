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
import { HeroDialogService } from "../services/hero-dialog/hero-dialog-service";
import { LoadingService } from "../services/loading/loading-service";

export const HTTPInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService);
  const dialogService = inject(HeroDialogService);

  loadingService.show();

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      dialogService.openErrorDialog();
      return throwError(() => error);
    }),
    finalize(() => {
      loadingService.hide();
    }),
  );
};
