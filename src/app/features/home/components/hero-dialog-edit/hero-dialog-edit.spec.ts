import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { HeroDialogEdit } from "./hero-dialog-edit";

describe("HeroDialogEdit", () => {
  let component: HeroDialogEdit;
  let fixture: ComponentFixture<HeroDialogEdit>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HeroDialogEdit>>;
  let heroContextSpy: jasmine.SpyObj<HeroContextService>;

  const mockHero: Hero = {
    id: 1,
    name: "Superman",
    alias: "Clark Kent",
    powerLevel: 90,
  };

  const mockDialogData: HeroDialogData = {
    hero: mockHero,
    title: "Edit Hero: Superman",
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj("MatDialogRef", ["close"]);
    heroContextSpy = jasmine.createSpyObj("HeroContextService", ["updateHero"]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, HeroDialogEdit],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: HeroContextService, useValue: heroContextSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDialogEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with hero data", () => {
    expect(component.heroForm.get("name")?.value).toBe(mockHero.name);
    expect(component.heroForm.get("alias")?.value).toBe(mockHero.alias);
    expect(component.heroForm.get("powerLevel")?.value).toBe(
      mockHero.powerLevel
    );
  });

  it("should validate required fields", () => {
    const nameControl = component.heroForm.get("name");
    const aliasControl = component.heroForm.get("alias");
    const powerLevelControl = component.heroForm.get("powerLevel");

    nameControl?.setValue("");
    aliasControl?.setValue("");
    powerLevelControl?.setValue(null);

    expect(nameControl?.errors?.["required"]).toBeTruthy();
    expect(aliasControl?.errors?.["required"]).toBeTruthy();
    expect(powerLevelControl?.errors?.["required"]).toBeTruthy();
  });

  it("should validate power level range", () => {
    const powerLevelControl = component.heroForm.get("powerLevel");

    powerLevelControl?.setValue(-1);
    expect(powerLevelControl?.errors?.["min"]).toBeTruthy();

    powerLevelControl?.setValue(101);
    expect(powerLevelControl?.errors?.["max"]).toBeTruthy();

    powerLevelControl?.setValue(50);
    expect(powerLevelControl?.errors).toBeNull();
  });

  it("should update hero and close dialog when form is valid", () => {
    const updatedHero = {
      ...mockHero,
      name: "Superman Updated",
      alias: "Clark Kent Updated",
      powerLevel: 95,
    };

    component.heroForm.patchValue({
      name: updatedHero.name,
      alias: updatedHero.alias,
      powerLevel: updatedHero.powerLevel,
    });

    component.onSubmit();

    expect(heroContextSpy.updateHero).toHaveBeenCalledWith(updatedHero);
    expect(dialogRef.close).toHaveBeenCalledWith(updatedHero);
  });

  it("should not update hero when form is invalid", () => {
    component.heroForm.get("name")?.setValue("");
    component.onSubmit();

    expect(heroContextSpy.updateHero).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it("should close dialog without updating when closeDialog is called", () => {
    component.closeDialog();
    expect(dialogRef.close).toHaveBeenCalled();
    expect(heroContextSpy.updateHero).not.toHaveBeenCalled();
  });
});
