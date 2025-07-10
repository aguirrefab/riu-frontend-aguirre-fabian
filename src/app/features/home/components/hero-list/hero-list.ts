import { PercentPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { HeroService } from "../../../../core/services/hero/hero.service";
import { Hero } from "../../../../shared/models/hero.model";
import { HeroDialogService } from "../../services/hero-dialog-service";

@Component({
  selector: "app-hero-list",
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule,
    PercentPipe,
  ],
  providers: [HeroDialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-list.html",
  styleUrl: "./hero-list.scss",
})
export class HeroList {
  displayedColumns: string[] = ["name", "alias", "powerLevel", "actions"];
  searchControl = new FormControl("");
  totalHeroes = signal(0);
  pageSize = 10;
  pageIndex = 0;
  heroes = signal<Hero[]>([]);
  filteredHeroes = signal<Hero[]>([]);

  private heroService = inject(HeroService);
  private dialog = inject(HeroDialogService);

  pagedHeroes = computed(() => {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredHeroes().slice(startIndex, startIndex + this.pageSize);
  });

  ngOnInit(): void {
    this.loadHeroes();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        const heroes = this.heroService.searchHeroes(term || "");
        this.filteredHeroes.set(heroes);
        this.totalHeroes.set(heroes.length);
        this.pageIndex = 0;
      });
  }

  private loadHeroes(): void {
    const heroes = this.heroService.getHeroes() || [];
    this.heroes.set(heroes);
    this.filteredHeroes.set([...heroes]);
    this.totalHeroes.set(heroes.length);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openHeroDetail(hero: Hero): void {
    this.dialog.openHeroDialogDetail({
      hero,
      title: `Hero Details: ${hero.name}`,
    });
  }

  getPowerLevelColor(level: number = 0): string {
    if (level >= 80) return "warn";
    if (level >= 50) return "accent";
    return "primary";
  }
}
