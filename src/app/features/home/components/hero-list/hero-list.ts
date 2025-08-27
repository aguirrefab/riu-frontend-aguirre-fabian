import { PercentPipe, UpperCasePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatSortModule, Sort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { LoadingService } from "@services/loading/loading-service";
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state";
import { Loader } from "@shared/components/loader/loader";
import { Hero } from "@shared/models/hero.model";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { SortAction } from "../../../../shared/interfaces/sort-action.interface";
import { SortType } from "../../../../shared/types/sort-by.type";

@Component({
  selector: "app-hero-list",
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBar,
    ReactiveFormsModule,
    PercentPipe,
    MatTooltip,
    MatButtonModule,
    UpperCasePipe,
    EmptyStateComponent,
    Loader,
    MatSortModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-list.html",
  styleUrl: "./hero-list.scss",
})
export class HeroList implements OnInit {
  private heroService = inject(HeroContextService);
  private dialog = inject(HeroDialogService);
  private loadingService = inject(LoadingService);

  isLoading = this.loadingService.isLoading();
  displayedColumns: string[] = ["name", "alias", "powerLevel", "actions"];
  searchControl = new FormControl("");

  heroes = computed(() => this.heroService.heroes());
  results = computed(() => this.heroService.totalItems());

  pageSize = signal(10);
  pageIndex = signal(0);
  searchTerm = signal("");
  sortAction = signal<SortAction>({
    column: "name",
    sortOrder: "asc",
  });

  ngOnInit(): void {
    this.fetchHeroes();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchTerm.set(value || "");
        this.pageIndex.set(0);
        this.fetchHeroes();
      });
  }

  fetchHeroes(): void {
    this.heroService.getHeroes({
      offset: this.pageIndex(),
      limit: this.pageSize(),
      searchBy: this.searchTerm(),
      sortOrder: this.sortAction().sortOrder,
      sortBy: this.sortAction().column,
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);

    this.fetchHeroes();
  }

  onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.sortAction.set({
        column: sortState.active as SortType,
        sortOrder: sortState.direction,
      });
      this.fetchHeroes();
    }
  }

  openHeroDetail(hero: Hero): void {
    this.dialog.openDetailHero({
      hero,
    });
  }

  getPowerLevelColor(level: number = 0): string {
    if (level >= 80) return "warn";
    if (level >= 50) return "accent";
    return "primary";
  }

  editHero(hero: Hero): void {
    this.dialog
      .openEditHero({
        hero,
      })
      .afterClosed()
      .subscribe((result?: Hero) => {
        if (result) {
          this.heroService.updateHero(result);
          this.fetchHeroes();
        }
      });
  }

  deleteHero(hero: Hero): void {
    this.dialog
      .openDeleteHero({
        hero,
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.heroService.deleteHero(hero.id);

          const maxPageIndex = Math.max(
            0,
            Math.ceil(this.results() / this.pageSize()) - 1,
          );

          if (this.pageIndex() > maxPageIndex) {
            this.pageIndex.set(maxPageIndex);
          }
          this.fetchHeroes();
        }
      });
  }

  addNewHero(): void {
    this.dialog
      .openAddHero()
      .afterClosed()
      .subscribe((result?: Hero) => {
        if (result) {
          this.heroService.addHero(result);

          const newLastPage = Math.floor(
            (this.results() - 1) / this.pageSize(),
          );

          this.pageIndex.set(newLastPage);
          this.fetchHeroes();
        }
      });
  }
}
