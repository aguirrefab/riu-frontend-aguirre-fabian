import { PercentPipe } from "@angular/common";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HeroService } from "../../../../core/services/hero/hero.service";
import { Hero } from "../../../../shared/models/hero.model";
import { HeroList } from "./hero-list";

describe(`${HeroList.name}`, () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const HEROES: Hero[] = [
    { id: 1, name: "Superman", alias: "Clark Kent", powerLevel: 90 },
    { id: 2, name: "Batman", alias: "Bruce Wayne", powerLevel: 70 },
    { id: 3, name: "Robin", alias: "Dick Grayson", powerLevel: 40 },
  ];

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj("HeroService", [
      "getHeroes",
      "searchHeroes",
    ]);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        RouterModule,
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        PercentPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load heroes on init", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    component.ngOnInit();
    expect(component.heroes()).toEqual(HEROES);
    expect(component.filteredHeroes()).toEqual(HEROES);
    expect(component.totalHeroes()).toBe(HEROES.length);
  });

  it("should filter heroes on search", fakeAsync(() => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    heroServiceSpy.searchHeroes.and.callFake((term: string) =>
      HEROES.filter((h) => h.name.toLowerCase().includes(term.toLowerCase()))
    );
    component.ngOnInit();
    component.searchControl.setValue("bat");
    tick(300);
    expect(component.filteredHeroes()).toEqual([HEROES[1]]);
    expect(component.totalHeroes()).toBe(1);
    expect(component.pageIndex).toBe(0);
  }));

  it("should paginate heroes", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    component.ngOnInit();
    component.pageSize = 2;
    component.pageIndex = 1;
    const paged = component.pagedHeroes();
    expect(paged.length).toBe(1);
    expect(paged[0].name).toBe("Robin");
  });

  it("should open hero detail dialog when clicking on the view button", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    const spy = spyOn(component, "openHeroDetail");

    const buttons = fixture.debugElement.queryAll(By.css("button"));
    expect(buttons.length).toBeGreaterThan(0);
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(HEROES[0]);
  });

  it("should return correct power level color", () => {
    expect(component.getPowerLevelColor(90)).toBe("warn");
    expect(component.getPowerLevelColor(70)).toBe("accent");
    expect(component.getPowerLevelColor(30)).toBe("primary");
    expect(component.getPowerLevelColor()).toBe("primary");
  });

  it("should update pageSize and pageIndex on page change", () => {
    const event = { pageSize: 5, pageIndex: 2 } as any;
    component.onPageChange(event);
    expect(component.pageSize).toBe(5);
    expect(component.pageIndex).toBe(2);
  });
});
