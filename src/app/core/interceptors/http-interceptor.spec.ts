import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LoadingService } from "../services/loading/loading-service";
import { HTTPInterceptor } from "./http-interceptor";

describe(`${HTTPInterceptor.name}`, () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    loadingServiceSpy = jasmine.createSpyObj("LoadingService", [
      "show",
      "hide",
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([HTTPInterceptor])),
        provideHttpClientTesting(),
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should call show() and hide() on success", () => {
    http.get("/api/success").subscribe((res) => {
      expect(res).toEqual({ data: "ok" });
    });

    const req = httpMock.expectOne((r) => r.url.endsWith("/api/success"));
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    req.flush({ data: "ok" });
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });

  it("should call show() and hide() on error", () => {
    http.get("/api/error").subscribe({
      next: () => fail("should have failed with 404 error"),
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect(err.message).toBe(
          "Http failure response for /api/error: 404 Not Found",
        );
      },
    });

    const req = httpMock.expectOne((r) => r.url.endsWith("/api/error"));
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    req.flush("Error", { status: 404, statusText: "Not Found" });
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });
});
