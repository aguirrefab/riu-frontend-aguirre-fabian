import { HeroContextService } from "./hero-context.service";

describe(`${HeroContextService.name}`, () => {
  let service: HeroContextService;

  beforeEach(() => {
    service = new HeroContextService();
  });

  describe("searchHeroes", () => {
    it("should return all heroes if search term is empty", () => {
      const result = service.searchHeroes("");
      expect(result.length).toBe(3);
      expect(result).toEqual(service.getHeroes());
    });

    it("should return all heroes if search term is whitespace", () => {
      const result = service.searchHeroes("   ");
      expect(result.length).toBe(3);
      expect(result).toEqual(service.getHeroes());
    });

    it("should return heroes matching the name (case-insensitive)", () => {
      const result = service.searchHeroes("clark");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("CLARK KENT");
    });

    it("should return heroes matching the alias (case-insensitive)", () => {
      const result = service.searchHeroes("batman");
      expect(result.length).toBe(1);
      expect(result[0].alias).toBe("Batman");
    });

    it("should return heroes matching partial name", () => {
      const result = service.searchHeroes("kent");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("CLARK KENT");
    });

    it("should return heroes matching partial alias", () => {
      const result = service.searchHeroes("wonder");
      expect(result.length).toBe(1);
      expect(result[0].alias).toBe("Wonder Woman");
    });

    it("should return an empty array if no hero matches", () => {
      const result = service.searchHeroes("spiderman");
      expect(result.length).toBe(0);
    });

    it("should return multiple heroes if multiple match", () => {
      const result = service.searchHeroes("a");
      expect(result.length).toBeGreaterThan(1);
      expect(result.some((hero) => hero.name === "CLARK KENT")).toBeTrue();
      expect(result.some((hero) => hero.name === "BRUCE WAYNE")).toBeTrue();
    });
  });
});
