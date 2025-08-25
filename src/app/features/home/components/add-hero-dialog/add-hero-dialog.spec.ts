import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { HeroContextService } from "@src/app/core/services/hero-context/hero-context.service";
import { AddHeroDialog } from "./add-hero-dialog";

describe(`${AddHeroDialog.name}`, () => {
  let component: AddHeroDialog;
  let fixture: ComponentFixture<AddHeroDialog>;

  const dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async () => {
    const mockHeroContextService = jasmine.createSpyObj("HeroContextService", [
      "addHero",
      "getHeroes",
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddHeroDialog],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: HeroContextService, useValue: mockHeroContextService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have an invalid form initially", () => {
    expect(component.heroForm.valid).toBeFalse();
  });

  it("should validate form and call addHero on submit", () => {
    const heroData = { name: "Test", alias: "Alias", powerLevel: 50 };

    component.heroForm.patchValue({
      name: heroData.name,
      alias: heroData.alias,
      powerLevel: heroData.powerLevel,
    });

    expect(component.heroForm.valid).toBeTrue();
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(heroData);
  });
});
