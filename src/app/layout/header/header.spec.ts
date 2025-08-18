import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Header } from "./header";

describe(`${Header.name}`, () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the header component", () => {
    expect(component).toBeTruthy();
  });

  it("should render the header element with correct class", () => {
    const headerEl = fixture.debugElement.query(By.css("header.app-header"));
    expect(headerEl).toBeTruthy();
  });

  it("should display the correct title", () => {
    const h1 = fixture.debugElement.query(By.css("h1")).nativeElement;
    expect(h1.textContent).toContain("RIU Frontend Challenge");
  });

  it("should have correct styles applied", () => {
    const headerEl: HTMLElement = fixture.debugElement.query(
      By.css("header.app-header")
    ).nativeElement;
    const styles = getComputedStyle(headerEl);
    expect(styles.backgroundColor).toBe("rgb(230, 0, 42)");
    expect(styles.color).toBe("rgb(255, 255, 255)");
    expect(styles.textAlign).toBe("center");
  });
});
