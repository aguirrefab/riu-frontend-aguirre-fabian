import { PercentPipe } from "@angular/common";
import { signal } from "@angular/core";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { Hero } from "@shared/models/hero.model";
import { of } from "rxjs";
import { HeroList } from "./hero-list";

describe(`${HeroList.name}`, () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let heroServiceSpy: jasmine.SpyObj<HeroContextService>;
  let heroDialogSpy: jasmine.SpyObj<HeroDialogService>;

  const mockHeroList: Hero[] = [
    { id: 1, name: "Superman", alias: "Clark Kent", powerLevel: 90 },
    { id: 2, name: "Batman", alias: "Bruce Wayne", powerLevel: 70 },
    { id: 3, name: "Robin", alias: "Dick Grayson", powerLevel: 40 },
  ];

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj("HeroContextService", [
      "getHeroes",
      "loadDataForMockAPI",
      "addHero",
      "deleteHero",
      "updateHero",
    ]);

    heroDialogSpy = jasmine.createSpyObj("HeroDialogService", [
      "openDetailHero",
      "openAddHero",
      "openDeleteHero",
      "openEditHero",
    ]);

    (heroDialogSpy.openAddHero as jasmine.Spy).and.returnValue({
      afterClosed: () =>
        of({ id: 4, name: "Flash", alias: "Barry Allen", powerLevel: 85 }),
    });

    (heroDialogSpy.openEditHero as jasmine.Spy).and.returnValue({
      afterClosed: () =>
        of({ id: 1, name: "Superman", alias: "Clark Kent", powerLevel: 95 }),
    });

    (heroDialogSpy.openDeleteHero as jasmine.Spy).and.returnValue({
      afterClosed: () => of(true),
    });

    (heroDialogSpy.openDetailHero as jasmine.Spy).and.returnValue({
      afterClosed: () => of(mockHeroList[2]),
    });

    (heroServiceSpy as any).totalItems = signal(3);

    (heroServiceSpy as any).heroes = signal(mockHeroList);

    await TestBed.configureTestingModule({
      imports: [HeroList],
      providers: [
        { provide: HeroContextService, useValue: heroServiceSpy },
        { provide: HeroDialogService, useValue: heroDialogSpy },
        PercentPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should load heroes from service", () => {
    expect(component.heroes()).toEqual(mockHeroList);
    expect(component.results()).toBe(mockHeroList.length);
  });

  it("should call heroService.getHeroes on init and on search", fakeAsync(() => {
    const getHeroesSpy = heroServiceSpy.getHeroes.and.stub();
    fixture.detectChanges();

    expect(getHeroesSpy).toHaveBeenCalledWith({
      offset: 0,
      limit: component.pageSize(),
      searchBy: "",
      sortOrder: "asc",
      sortBy: "name",
    });

    const input = "superman";
    component.searchControl.setValue(input);
    tick(300);

    expect(getHeroesSpy).toHaveBeenCalledWith({
      offset: 0,
      limit: component.pageSize(),
      searchBy: input,
      sortBy: "name",
      sortOrder: "asc",
    });
  }));

  it("should return all heroes paginated when the input search is cleared", fakeAsync(() => {
    const getHeroesSpy = heroServiceSpy.getHeroes.and.stub();
    fixture.detectChanges();

    component.searchControl.setValue("");
    tick(300);

    expect(getHeroesSpy).toHaveBeenCalledTimes(2);
    expect(getHeroesSpy).toHaveBeenCalledWith({
      offset: 0,
      limit: component.pageSize(),
      searchBy: "",
      sortBy: "name",
      sortOrder: "asc",
    });
  }));

  it("should open add hero dialog", () => {
    component.addNewHero();
    expect(heroDialogSpy.openAddHero).toHaveBeenCalled();
  });

  it("should add a new hero and call addHero", () => {
    const newHero: Hero = {
      id: 4,
      name: "Flash",
      alias: "Barry Allen",
      powerLevel: 85,
    };

    component.addNewHero();
    expect(heroServiceSpy.addHero).toHaveBeenCalledWith(newHero);
  });

  it("should open edit hero dialog", () => {
    const hero = mockHeroList[0];
    component.editHero(hero);
    expect(heroDialogSpy.openEditHero).toHaveBeenCalledWith({ hero });
  });

  it("should open delete hero dialog", () => {
    const hero = mockHeroList[1];
    component.deleteHero(hero);
    expect(heroDialogSpy.openDeleteHero).toHaveBeenCalledWith({ hero });
  });

  it("should open detail hero dialog", () => {
    const hero = mockHeroList[2];
    component.openHeroDetail(hero);
    expect(heroDialogSpy.openDetailHero).toHaveBeenCalledWith({ hero });
  });
});
