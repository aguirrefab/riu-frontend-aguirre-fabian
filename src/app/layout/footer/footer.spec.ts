import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Footer } from "./footer";

describe(`${Footer.name}`, () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the footer component", () => {
    expect(component).toBeTruthy();
  });

  it("should render the footer element", () => {
    const footerElem = fixture.debugElement.query(By.css("footer.app-footer"));
    expect(footerElem).toBeTruthy();
  });

  it("should display the correct copyright text", () => {
    const pElem = fixture.debugElement.query(By.css("footer.app-footer p"));
    expect(pElem.nativeElement.textContent).toContain(
      "© 2025 RIU Frontend Challenge - Aguirre Fabian"
    );
  });

  it("should have the correct class on the footer", () => {
    const footerElem = fixture.debugElement.query(By.css("footer"));
    expect(footerElem.nativeElement.classList).toContain("app-footer");
  });
});
