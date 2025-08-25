import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogRef } from "@angular/material/dialog";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Hero } from "@shared/models/hero.model";
import { DialogContainer } from "./dialog-container";

describe(`${DialogContainer.name}`, () => {
  let component: DialogContainer;
  let fixture: ComponentFixture<DialogContainer>;

  const mockHero: Hero = {
    id: 1,
    name: "Spider-Man",
    alias: "Peter Parker",
    powerLevel: 85,
  };
  const dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContainer, NoopAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the title", () => {
    const expectedTitle = "Test Title";
    fixture.componentRef.setInput("title", expectedTitle);
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css("h2")).nativeElement;
    expect(titleElement.textContent).toContain(expectedTitle);
  });

  it("should display hero name in uppercase when hero is provided", () => {
    fixture.componentRef.setInput("hero", mockHero);
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(
      By.css("h2 span"),
    ).nativeElement;
    expect(titleElement.textContent).toContain(mockHero.name.toUpperCase());
  });

  it("should show submit button when showSubmitButton is true", () => {
    fixture.componentRef.setInput("showSubmitButton", true);
    fixture.componentRef.setInput("submitLabel", "Save");

    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    expect(submitButton).toBeTruthy();
    expect(submitButton.nativeElement.textContent.trim()).toBe("Save");
  });

  it("should not show submit button when showSubmitButton is false", () => {
    fixture.componentRef.setInput("showSubmitButton", false);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    expect(submitButton).toBeNull();
  });

  it("should disable submit button when submitDisabled is true", () => {
    fixture.componentRef.setInput("showSubmitButton", true);
    fixture.componentRef.setInput("submitDisabled", true);
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[aria-label="Submit modal"]'),
    );
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  it("should close dialog when close button is clicked", () => {
    const closeButton = fixture.debugElement.query(
      By.css('button[aria-label="Close modal"]'),
    );
    closeButton.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it("should emit submitDialog event with hero when submit button is clicked", () => {
    (component.showSubmitButton as any).value = true;
    fixture.componentRef.setInput("showSubmitButton", true);
    fixture.componentRef.setInput("hero", mockHero);
    const submitDialogSpy = spyOn(component.submitDialog, "emit");

    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    submitButton.nativeElement.click();
    expect(submitDialogSpy).toHaveBeenCalledWith(mockHero);
  });

  it("should project content into mat-card-content", () => {
    const testBed = TestBed.createComponent(DialogContainer);
    testBed.componentInstance = component;
    const content = "<p>Projected content</p>";
    testBed.nativeElement.innerHTML = content;

    testBed.detectChanges();
    const projectedContent = testBed.debugElement.query(
      By.css("mat-card-content"),
    );
    expect(projectedContent).toBeTruthy();
  });
});
