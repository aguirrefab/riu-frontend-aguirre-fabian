import { LiveAnnouncer } from "@angular/cdk/a11y";
import { PercentPipe, UpperCasePipe } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { LoadingService } from "@services/loading/loading-service";
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state";
import { Loader } from "@shared/components/loader/loader";
import { Hero } from "@shared/models/hero.model";
import { debounceTime, distinctUntilChanged } from "rxjs";

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
export class HeroList implements OnInit, AfterViewInit {
  private heroService = inject(HeroContextService);
  private dialog = inject(HeroDialogService);
  private loadingService = inject(LoadingService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  isLoading = this.loadingService.isLoading();
  displayedColumns: string[] = ["name", "alias", "powerLevel", "actions"];
  searchControl = new FormControl("");

  heroes = computed(() => new MatTableDataSource(this.heroService.heroes()));
  results = computed(() => this.heroService.totalItems());

  // dataSource = new MatTableDataSource(this.heroes());

  pageSize = signal(10);
  pageIndex = signal(0);
  searchTerm = signal("");

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.heroes().sort = this.sort;
  }

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
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);

    this.fetchHeroes();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
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
