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
  ]);

  heroes = this._heroesSignal.asReadonly();

  getHeroes(): Hero[] {
    return this._heroesSignal();
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
}
