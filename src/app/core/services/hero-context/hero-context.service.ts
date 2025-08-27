import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { HeroesRequest } from "@shared/interfaces/heroes-request.interface";
import { Hero } from "@shared/models/hero.model";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeroContextService {
  private http = inject(HttpClient);
  private _allHeroes = signal<Hero[]>([]); // represneta el data store de registros
  private _heroes = signal<Hero[]>([]); // representa el resutlado paginado por backend

  heroes = this._heroes.asReadonly();
  totalItems = computed(() => this._allHeroes().length);

  // simula carga de datos disponible en backend
  loadDataForMockAPI(): void {
    this.http
      .get<{ heroes: Hero[] }>("assets/data/heroes.json")
      .pipe(
        catchError((err) => {
          console.error("Error loading heroes:", err);
          this._allHeroes.set([]);
          return throwError(() => err);
        }),
      )
      .subscribe((data) => {
        this._allHeroes.set(data.heroes);
      });
  }

  // método que simula ejecución de request a la api por queryParams
  getHeroes(params: HeroesRequest): void {
    const filtered = this._allHeroes().filter(
      (hero) =>
        hero.name.toLowerCase().includes(params.searchBy.toLowerCase()) ||
        (hero.alias &&
          hero.alias.toLowerCase().includes(params.searchBy.toLowerCase())),
    );
    const start = params.offset * params.limit;
    const end = start + params.limit;
    const items = filtered.slice(start, end);
    this._heroes.set(items);
  }

  getHeroById(id: number): Hero | undefined {
    return this._allHeroes().find((hero) => hero.id === id);
  }

  updateHero(hero: Hero): void {
    const heroes = this._allHeroes();
    const index = heroes.findIndex((h) => h.id === hero.id);

    if (index === -1) {
      console.warn(`Hero with id ${hero.id} not found`);
      return;
    }

    heroes[index] = hero;
    this._allHeroes.set([...heroes]);
  }

  deleteHero(heroId: number): void {
    const filteredHeroes = this._allHeroes().filter(
      (hero) => hero.id !== heroId,
    );
    this._allHeroes.set(filteredHeroes);
  }

  addHero(hero: Hero): void {
    const newId = this._allHeroes().length
      ? Math.max(...this._allHeroes().map((h) => h.id)) + 1
      : 1;
    const newHero = { ...hero, id: newId };
    const updatedAll = [...this._allHeroes(), newHero];
    this._allHeroes.set(updatedAll);
  }
}
