import { TestBed } from "@angular/core/testing";

import { LoadingService } from "./loading-service";

describe(`${LoadingService.name}`, () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should start loading", () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });
});
