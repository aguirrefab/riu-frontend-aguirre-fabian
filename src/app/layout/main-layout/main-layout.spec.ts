import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MainLayout } from "./main-layout";

describe(`${MainLayout.name}`, () => {
  let fixture: ComponentFixture<MainLayout>;
  let component: MainLayout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the main layout component", () => {
    expect(component).toBeTruthy();
  });

  it("should render the header component", () => {
    const header = fixture.debugElement.query(By.css("app-header"));
    expect(header).toBeTruthy();
  });

  it("should render the content component", () => {
    const content = fixture.debugElement.query(By.css("app-content"));
    expect(content).toBeTruthy();
  });

  it("should render the footer component", () => {
    const footer = fixture.debugElement.query(By.css("app-footer"));
    expect(footer).toBeTruthy();
  });
});
