import { PercentPipe } from "@angular/common";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { Hero } from "@shared/models/hero.model";
import { HeroList } from "./hero-list";

describe(`${HeroList.name}`, () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let heroServiceSpy: jasmine.SpyObj<HeroContextService>;
  let heroDialogSpy: jasmine.SpyObj<HeroDialogService>;

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

    heroDialogSpy = jasmine.createSpyObj("HeroDialogService", [
      "openDetail",
      "openEdit",
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
      ],
      providers: [
        { provide: HeroContextService, useValue: heroServiceSpy },
        { provide: HeroDialogService, useValue: heroDialogSpy },
        PercentPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display all heroes initially", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    expect(component.filteredHeroes()).toEqual(HEROES);
    expect(component.totalHeroes()).toBe(HEROES.length);
  });

  it("should filter heroes when search term changes", fakeAsync(() => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    component.searchControl.setValue("bat");
    tick(300);

    const expectedHeroes = [HEROES[1]]; // Batman
    expect(component.filteredHeroes()).toEqual(expectedHeroes);
    expect(component.totalHeroes()).toBe(1);
    expect(component.pageIndex).toBe(0);
  }));

  it("should filter heroes by alias", fakeAsync(() => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    component.searchControl.setValue("wayne");
    tick(300);

    const expectedHeroes = [HEROES[1]]; // Bruce Wayne
    expect(component.filteredHeroes()).toEqual(expectedHeroes);
    expect(component.totalHeroes()).toBe(1);
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

  it("should open hero detail dialog when clicking the view button", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    component.openHeroDetail(HEROES[0]);

    expect(heroDialogSpy.openDetail).toHaveBeenCalledWith({
      hero: HEROES[0],
    } as HeroDialogData);
  });

  it("should open edit dialog when clicking the edit button", () => {
    heroServiceSpy.getHeroes.and.returnValue(HEROES);
    fixture.detectChanges();

    component.editHero(HEROES[0]);

    expect(heroDialogSpy.openEdit).toHaveBeenCalledWith({
      hero: HEROES[0],
    } as HeroDialogData);
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
