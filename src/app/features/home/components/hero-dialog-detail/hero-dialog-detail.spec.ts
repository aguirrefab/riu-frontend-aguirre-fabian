import { PercentPipe } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { HeroDialogDetail } from "./hero-dialog-detail";

describe(`${HeroDialogDetail.name}`, () => {
  let component: HeroDialogDetail;
  let fixture: ComponentFixture<HeroDialogDetail>;
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
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
      ],
      providers: [
        PercentPipe,
        { provide: MAT_DIALOG_DATA, useValue: mockData },
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
});
