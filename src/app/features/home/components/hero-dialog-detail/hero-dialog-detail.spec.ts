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
    expect(
      fixture.nativeElement.querySelector("mat-progress-bar")
    ).toBeTruthy();
  });

  it("should inject MAT_DIALOG_DATA correctly", () => {
    expect(component.data).toEqual(mockData);
    expect(component.data.hero.name).toContain(mockData.hero.name);
    expect(component.data.hero.alias).toContain(mockData.hero.alias);
  });

  it("should call close method of HeroDialogService when closeDialog is called", () => {
    component.closeDialog();
    expect(heroDialogService.close).toHaveBeenCalled();
  });

  it("should close dialog when closeDialog is called", () => {
    component.closeDialog();
    expect(heroDialogService.close).toHaveBeenCalled();
  });
});
