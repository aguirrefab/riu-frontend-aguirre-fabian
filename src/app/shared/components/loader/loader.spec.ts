import { ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { Loader } from "./loader";

describe(`${Loader.name}`, () => {
  let component: Loader;
  let fixture: ComponentFixture<Loader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loader],
    }).compileComponents();

    fixture = TestBed.createComponent(Loader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should render a progress spinner", () => {
    const spinner = fixture.debugElement.query(By.css("mat-progress-spinner"));
    expect(spinner).toBeTruthy();
  });

  it("should display the loading text", () => {
    const text = fixture.debugElement.query(By.css("h5")).nativeElement
      .textContent;
    expect(text).toContain("Getting heroes...");
  });
});
