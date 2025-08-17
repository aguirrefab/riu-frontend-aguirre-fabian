import { PercentPipe } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroContextService } from "../../../../core/services/hero-context/hero-context.service";
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
      imports: [HeroDialogDetail, DialogContainer],
      providers: [
        PercentPipe,
        provideHttpClient(),
        HeroContextService,
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
      fixture.nativeElement.querySelector("mat-progress-bar"),
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
