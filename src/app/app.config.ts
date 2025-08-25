import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { routes } from "./app.routes";
import { HTTPInterceptor } from "./core/interceptors/http-interceptor";
import { HeroContextService } from "./core/services/hero-context/hero-context.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
    ),
    provideHttpClient(withInterceptors([HTTPInterceptor])),
    provideAppInitializer(() => {
      const heroService = inject(HeroContextService);
      return heroService.loadDataForMockAPI();
    }),
  ],
};
