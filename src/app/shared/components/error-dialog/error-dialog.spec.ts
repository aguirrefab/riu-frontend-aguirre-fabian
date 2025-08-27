import { ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { ErrorDialog } from "./error-dialog";

describe(`${ErrorDialog.name}`, () => {
  let component: ErrorDialog;
  let fixture: ComponentFixture<ErrorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call window.location.reload when Retry button is clicked", () => {
    spyOn(component, "onRetryAction");
    const button = fixture.debugElement.query(By.css("button"));
    expect(button).toBeDefined();
    button.triggerEventHandler("click", null);
    expect(component.onRetryAction).toHaveBeenCalled();
  });
});
