import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { HeroContextService } from "@src/app/features/home/services/hero-context/hero-context.service";
import { AddHeroDialog } from "./add-hero-dialog";

describe(`${AddHeroDialog.name}`, () => {
  let component: AddHeroDialog;
  let fixture: ComponentFixture<AddHeroDialog>;
  let heroContextServiceSpy: jasmine.SpyObj<HeroContextService>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<AddHeroDialog>>;

  beforeEach(async () => {
    const mockHeroContextService = jasmine.createSpyObj("HeroContextService", [
      "addHero",
      "getHeroes",
    ]);

    const mockDialogRef = jasmine.createSpyObj("MatDialogRef", ["close"]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddHeroDialog],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: HeroContextService, useValue: mockHeroContextService },
      ],
    }).compileComponents();

    matDialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AddHeroDialog>
    >;
    heroContextServiceSpy = TestBed.inject(
      HeroContextService,
    ) as jasmine.SpyObj<HeroContextService>;

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
    component.heroForm.setValue(heroData);
    spyOn(component, "closeDialog");
    component.onSubmit();
    expect(heroContextServiceSpy.addHero).toHaveBeenCalled();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it("should close dialog on closeDialog()", () => {
    component.closeDialog();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});
