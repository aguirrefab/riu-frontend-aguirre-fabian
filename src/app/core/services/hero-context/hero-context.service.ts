import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { HeroesRequest } from "@shared/interfaces/heroes-request.interface";
import { Hero } from "@shared/models/hero.model";

@Injectable({
  providedIn: "root",
})
export class HeroContextService {
  private http = inject(HttpClient);
  private _allHeroes = signal<Hero[]>([]); //simula todo el store
  private _heroes = signal<Hero[]>([]);

  heroes = this._heroes.asReadonly();
  totalItems = computed(() => this._allHeroes().length);

  // simula carga de datos disponible en backend
  loadDataForMockAPI(): void {
    this.http
      .get<{ heroes: Hero[] }>("assets/data/heroes.json")
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
    return this._heroes().find((hero) => hero.id === id);
  }

  updateHero(hero: Hero): void {
    const heroes = this._heroes();
    const index = heroes.findIndex((h) => h.id === hero.id);
    if (index !== -1) {
      heroes[index] = hero;
      this._heroes.set([...heroes]);
    }
  }

  deleteHero(heroId: number, currentPage: number, pageSize: number): void {
    const filteredHeroes = this._allHeroes().filter(
      (hero) => hero.id !== heroId,
    );
    this._allHeroes.set(filteredHeroes);

    const lastPage = Math.floor((this.totalItems() - 1) / pageSize);
    const newPage = Math.min(currentPage, lastPage);

    this.getHeroes({
      offset: newPage,
      limit: pageSize,
      searchBy: "",
    });
  }

  addHero(hero: Hero): void {
    const newId = this._heroes().length
      ? Math.max(...this._heroes().map((h) => h.id)) + 1
      : 1;
    const newHero = { ...hero, id: newId };
    this._heroes.set([...this._heroes(), newHero]);
    this._allHeroes.set([...this._allHeroes(), newHero]);
  }
}
