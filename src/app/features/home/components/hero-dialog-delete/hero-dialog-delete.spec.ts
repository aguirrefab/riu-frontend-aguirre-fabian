import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { HeroDialogDelete } from "./hero-dialog-delete";

describe(HeroDialogDelete.name, () => {
  let component: HeroDialogDelete;
  let fixture: ComponentFixture<HeroDialogDelete>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HeroDialogDelete>>;

  const mockHero: Hero = {
    id: 1,
    name: "Test Hero",
    alias: "Test Alias",
    powerLevel: 80,
  };

  const mockDialogData: HeroDialogData = {
    hero: mockHero,
    title: "Delete Hero: Test Hero",
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj("MatDialogRef", ["close"]);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, HeroDialogDelete],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
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
    expect(compiled.textContent).toContain(mockHero.name);
    expect(compiled.textContent).toContain(mockHero.alias);
    expect(compiled.textContent).toContain(
      (mockHero.powerLevel || 0).toString()
    );
  });

  it("should close with true when confirming delete", () => {
    component.onConfirm();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it("should close with false when canceling", () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it("should display delete confirmation message", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(
      "Are you sure you want to delete this hero?"
    );
  });

  it("should display dialog title correctly", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h2").textContent).toBe(mockDialogData.title);
  });

  it("should have cancel and delete buttons", () => {
    const buttons = fixture.nativeElement.querySelectorAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain("Cancel");
    expect(buttons[1].textContent).toContain("Delete");
  });

  it("should style delete button with warn color", () => {
    const deleteButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    );
    expect(deleteButton).toBeTruthy();
    expect(deleteButton.textContent).toContain("Delete");
  });
});
