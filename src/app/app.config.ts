import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
