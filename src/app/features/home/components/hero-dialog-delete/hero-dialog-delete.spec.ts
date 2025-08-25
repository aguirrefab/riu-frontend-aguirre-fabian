import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { HeroDialogDelete } from "./hero-dialog-delete";

describe(`${HeroDialogDelete.name}`, () => {
  let component: HeroDialogDelete;
  let fixture: ComponentFixture<HeroDialogDelete>;

  const mockHero: Hero = {
    id: 1,
    name: "Test Hero",
    alias: "Test Alias",
    powerLevel: 80,
  };

  const mockDialogData: HeroDialogData = {
    hero: mockHero,
  };

  const dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDialogDelete, DialogContainer],
      providers: [
        provideHttpClient(),
        HeroContextService,
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDialogDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display hero information correctly", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(
      "Are you sure you want to delete this hero?",
    );
    expect(compiled.textContent).toContain(mockHero.alias);
    expect(compiled.textContent).toContain(
      (mockHero.powerLevel || 0).toString(),
    );
  });

  it("should close with true when confirming delete", () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it("should display delete confirmation message", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(
      "Are you sure you want to delete this hero?",
    );
  });

  it("should display dialog title correctly", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2").textContent).toBe(
      ` Delete Hero: ${mockHero.name.toUpperCase()}`,
    );
  });

  it("should have cancel and delete buttons", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain("Close");
    expect(buttons[1].textContent).toContain("Delete");
  });

  // it("should call onCancel when cancel button is clicked", () => {
  //   spyOn(component, "onCancel");
  //   const cancelButton =
  //     fixture.nativeElement.querySelector("button:first-child");
  //   cancelButton.click();
  //   expect(component.onCancel).toHaveBeenCalled();
  // });

  it("should call onConfirm when delete button is clicked", () => {
    spyOn(component, "onConfirm");
    const deleteButton =
      fixture.nativeElement.querySelector("button:last-child");
    deleteButton.click();
    expect(component.onConfirm).toHaveBeenCalled();
  });
});
