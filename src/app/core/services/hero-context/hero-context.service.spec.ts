import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Hero } from "@shared/models/hero.model";
import { of } from "rxjs";
import { HeroContextService } from "./hero-context.service";

describe(`${HeroContextService.name}`, () => {
  let service: HeroContextService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockHeroes: Hero[] = [
    { id: 1, name: "Superman", alias: "Clark Kent", powerLevel: 90 },
    { id: 2, name: "Batman", alias: "Bruce Wayne", powerLevel: 70 },
    { id: 3, name: "Robin", alias: "Dick Grayson", powerLevel: 40 },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    httpClientSpy.get.and.returnValue(of({ heroes: mockHeroes }));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        HeroContextService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(HeroContextService);
  });

  beforeEach(() => {
    service.loadDataForMockAPI();
    service.getHeroes({
      offset: 0,
      limit: 5,
      searchBy: "",
    });
  });

  describe("getHeroes", () => {
    it("should filter by hero's name", () => {
      service.getHeroes({ searchBy: "bat", offset: 0, limit: 10 });
      expect(service.heroes().length).toBe(1);
      expect(service.heroes()[0].name).toBe("Batman");
    });

    it("should filter by hero's alias", () => {
      service.getHeroes({ searchBy: "Bruce", offset: 0, limit: 10 });
      expect(service.heroes().length).toBe(1);
      expect(service.heroes()[0].alias).toBe("Bruce Wayne");
    });

    it("should handle the results of heroes data paginated", () => {
      service.getHeroes({ searchBy: "", offset: 0, limit: 2 });
      expect(service.heroes().length).toBe(2);
      expect(service.heroes()[0].name).toBe("Superman");
      expect(service.heroes()[1].name).toBe("Batman");

      service.getHeroes({ searchBy: "", offset: 1, limit: 2 });
      expect(service.heroes().length).toBe(1);
      expect(service.heroes()[0].name).toBe("Robin");
    });

    it("should return empty when the hero don't exists", () => {
      service.getHeroes({ searchBy: "no-existe", offset: 0, limit: 10 });
      expect(service.heroes().length).toBe(0);
    });
  });

  describe("getHeroById", () => {
    it("should return the correct hero by id", () => {
      const result = service.getHeroById(1);
      expect(result).toBeDefined();
      expect(result?.name).toContain("Superman");
    });

    it("should return undefined for non-existent hero id", () => {
      const result = service.getHeroById(999);
      expect(result).toBeUndefined();
    });
  });

  describe("updateHero", () => {
    it("should update an existing hero", () => {
      const updatedHero = { ...mockHeroes[0], name: "CLARK KENT UPDATED" };
      service.updateHero(updatedHero);
      const result = service.getHeroById(1);
      expect(result?.name).toBe("CLARK KENT UPDATED");
    });

    it("should not modify heroes array if hero id does not exist", () => {
      const nonExistentHero = { id: 999, name: "NON EXISTENT", powerLevel: 50 };
      service.updateHero(nonExistentHero);
      expect(service.totalItems()).toBe(mockHeroes.length);
    });
  });

  describe("deleteHero", () => {
    it("should delete an existing hero", () => {
      service.deleteHero(1, 0, 10);
      const result = service.getHeroById(1);
      expect(result).toBeUndefined();
      expect(service.totalItems()).toBe(mockHeroes.length - 1);
    });

    it("should not modify heroes array if hero id does not exist", () => {
      service.deleteHero(23, 0, 10);
      expect(service.totalItems()).toBe(mockHeroes.length);
    });
  });

  describe("addHero", () => {
    it("should add a new hero with auto-generated id", () => {
      const newHero = {
        name: "DIANA PRINCE",
        alias: "Wonder Woman",
        powerLevel: 95,
      } as Hero;
      service.addHero(newHero);
      expect(service.heroes().length).toBe(mockHeroes.length + 1);
      const addedHero = service.heroes().find((h) => h.name === "DIANA PRINCE");
      expect(addedHero).toBeDefined();
      expect(addedHero?.id).toBe(4);
    });
  });
});
