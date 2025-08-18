import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Content } from "./content";

describe(`${Content.name}`, () => {
  let component: Content;
  let fixture: ComponentFixture<Content>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Content],
    }).compileComponents();

    fixture = TestBed.createComponent(Content);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it('should render a main element with class "app-content"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it("should contain a router-outlet inside main", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled?.querySelector("router-outlet")).toBeTruthy();
  });
});
