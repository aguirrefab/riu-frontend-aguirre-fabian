import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NotFound } from "./not-found";

describe(`${NotFound.name}`, () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NotFound,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should render the 404 message and content", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const icon = compiled.querySelector("mat-icon");
    expect(icon).toBeTruthy();
    expect(icon?.textContent).toBe("search_off");

    const heading = compiled.querySelector("h1");
    expect(heading?.textContent).toContain("404 - Page Not Found");

    const paragraph = compiled.querySelector("p");
    expect(paragraph?.textContent).toContain(
      "The page you are looking for does not exist.",
    );

    const link = compiled.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/");
    expect(link?.textContent).toContain("Go back home");
  });

  it("should apply correct styles to not-found-container", () => {
    const container = fixture.nativeElement.querySelector(
      ".not-found-container",
    );
    const computedStyles = getComputedStyle(container);

    expect(computedStyles.display).toBe("flex");
    expect(computedStyles.flexDirection).toBe("column");
    expect(computedStyles.alignItems).toBe("center");
    expect(computedStyles.justifyContent).toBe("center");
  });

  it("should apply correct styles to not-found-icon", () => {
    const icon = fixture.nativeElement.querySelector(".not-found-icon");
    const computedStyles = getComputedStyle(icon);

    expect(computedStyles.fontSize).toBe("48px");
    expect(computedStyles.width).toBe("48px");
    expect(computedStyles.color).toBe("rgb(248, 102, 102)");
  });
});
