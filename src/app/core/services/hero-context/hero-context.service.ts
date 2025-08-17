import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Hero } from "../../../shared/models/hero.model";

@Injectable({
  providedIn: "root",
})
export class HeroContextService {
  private _heroesSignal = signal<Hero[]>([]);
  private readonly http = inject(HttpClient);

  constructor() {
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.http
      .get<{ heroes: Hero[] }>("assets/data/heroes.json")
      .subscribe((data) => {
        this._heroesSignal.set(data.heroes);
      });
  }

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
        (hero.alias && hero.alias.toLowerCase().includes(searchTerm)),
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
