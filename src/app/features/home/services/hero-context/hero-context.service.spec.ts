import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Hero } from "@shared/models/hero.model";
import { of } from "rxjs";
import { HeroContextService } from "./hero-context.service";

describe(`${HeroContextService.name}`, () => {
  let service: HeroContextService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockHeroes = [
    {
      id: 1,
      name: "CLARK KENT",
      alias: "Superman",
      powerLevel: 100,
    },
    {
      id: 2,
      name: "BRUCE WAYNE",
      alias: "Batman",
      powerLevel: 90,
    },
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

  describe("searchHeroes", () => {
    it("should return all heroes if search term is empty", () => {
      const result = service.searchHeroes("");
      expect(result.length).toBe(mockHeroes.length);
      expect(result).toEqual(mockHeroes);
    });

    it("should return all heroes if search term is whitespace", () => {
      const result = service.searchHeroes("   ");
      expect(result.length).toBe(mockHeroes.length);
      expect(result).toEqual(mockHeroes);
    });

    it("should return heroes matching the name (case-insensitive)", () => {
      const result = service.searchHeroes("clark");
      expect(result.length).toBe(1);
      expect(result[0].name).toContain("CLARK KENT");
    });

    it("should return heroes matching the alias (case-insensitive)", () => {
      const result = service.searchHeroes("batman");
      expect(result.length).toBe(1);
      expect(result[0].alias).toBe("Batman");
    });

    it("should return heroes matching partial name", () => {
      const result = service.searchHeroes("kent");
      expect(result.length).toBe(1);
      expect(
        result.some((hero) => hero.name?.toLowerCase().includes("kent")),
      ).toBeTrue();
    });

    it("should return heroes matching partial alias", () => {
      const result = service.searchHeroes("man");
      expect(result.length).toBe(2);
      expect(
        result.every((hero) => hero.alias?.toLowerCase().includes("man")),
      ).toBeTrue();
    });

    it("should return an empty array if no hero matches", () => {
      const result = service.searchHeroes("nonexistent");
      expect(result.length).toBe(0);
    });

    it("should return multiple heroes if multiple match", () => {
      const result = service.searchHeroes("a");
      expect(result.length).toBeGreaterThan(1);

      expect(result[0].name).toContain("CLARK KENT");
    });
  });

  describe("getHeroById", () => {
    it("should return the correct hero by id", () => {
      const result = service.getHeroById(1);
      expect(result).toBeDefined();
      expect(result?.name).toContain("CLARK KENT");
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
      expect(service.getHeroes().length).toBe(mockHeroes.length);
    });
  });

  describe("deleteHero", () => {
    it("should delete an existing hero", () => {
      service.deleteHero(1);
      const result = service.getHeroById(1);
      expect(result).toBeUndefined();
      expect(service.getHeroes().length).toBe(mockHeroes.length - 1);
    });

    it("should not modify heroes array if hero id does not exist", () => {
      service.deleteHero(999);
      expect(service.getHeroes().length).toBe(mockHeroes.length);
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
      const heroes = service.getHeroes();
      expect(heroes.length).toBe(mockHeroes.length + 1);
      const addedHero = heroes.find((h) => h.name === "DIANA PRINCE");
      expect(addedHero).toBeDefined();
      expect(addedHero?.id).toBe(3);
    });
  });
});
