import { PercentPipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { HeroDialogDetail } from "./hero-dialog-detail";

describe(HeroDialogDetail.name, () => {
  let component: HeroDialogDetail;
  let fixture: ComponentFixture<HeroDialogDetail>;
  let heroDialogService: jasmine.SpyObj<HeroDialogService>;

  const mockData = {
    title: "Hero Details",
    hero: {
      id: 1,
      name: "Test Hero",
      alias: "Batman",
      powerLevel: 100,
    },
  };

  beforeEach(async () => {
    heroDialogService = jasmine.createSpyObj("HeroDialogService", ["close"]);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        NoopAnimationsModule,
        HeroDialogDetail,
      ],
      providers: [
        PercentPipe,
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: HeroDialogService, useValue: heroDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDialogDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should inject MAT_DIALOG_DATA correctly", () => {
    expect(component.data).toEqual(mockData);
  });

  it("should display hero details correctly in the template", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(mockData.hero.name);
    expect(compiled.textContent).toContain(mockData.hero.alias);
    expect(compiled.querySelector("mat-progress-bar")).toBeTruthy();
  });

  it("should close dialog when closeDialog is called", () => {
    component.closeDialog();
    expect(heroDialogService.close).toHaveBeenCalled();
  });
});
