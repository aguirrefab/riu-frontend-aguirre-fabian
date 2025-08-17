import { Injectable, signal } from "@angular/core";
import { Hero } from "../../../shared/models/hero.model";

@Injectable({
  providedIn: "root",
})
export class HeroContextService {
  private _heroesSignal = signal<Hero[]>([
    { id: 1, name: "CLARK KENT", alias: "Superman", powerLevel: 100 },
    { id: 2, name: "BRUCE WAYNE", alias: "Batman", powerLevel: 30 },
    { id: 3, name: "DIANA PRINCE", alias: "Wonder Woman", powerLevel: 95 },
    { id: 4, name: "PETER PARKER", alias: "Spiderman", powerLevel: 85 },
    { id: 5, name: "TONY STARK", alias: "Iron Man", powerLevel: 90 },
  ]);

  heroes = this._heroesSignal.asReadonly();

  getHeroes(): Hero[] {
    return this.heroes();
  }

  getHeroById(id: number): Hero | undefined {
    return this._heroesSignal().find((hero) => hero.id === id);
  }

  searchHeroes(term: string): Hero[] {
    if (!term.trim()) {
      return this.getHeroes();
    }
    const searchTerm = term.toLowerCase();
    return this._heroesSignal().filter(
      (hero) =>
        hero.name.toLowerCase().includes(searchTerm) ||
        (hero.alias && hero.alias.toLowerCase().includes(searchTerm))
    );
  }

  updateHero(hero: Hero): void {
    const heroes = this._heroesSignal();
    const index = heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      heroes[index] = hero;
      this._heroesSignal.set([...heroes]);
    }
  }

  deleteHero(heroId: number): void {
    const heroes = this._heroesSignal();
    const filteredHeroes = heroes.filter((hero) => hero.id !== heroId);
    if (filteredHeroes.length !== heroes.length) {
      this._heroesSignal.set(filteredHeroes);
    }
  }

  addHero(hero: Hero): void {
    const heroes = this._heroesSignal();
    const newId = heroes.length ? Math.max(...heroes.map((h) => h.id)) + 1 : 1;
    const newHero = { ...hero, id: newId };
    this._heroesSignal.set([...heroes, newHero]);
  }
}
