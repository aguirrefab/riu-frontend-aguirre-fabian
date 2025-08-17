import { PercentPipe } from "@angular/common";
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
import { MatTableModule } from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { HeroContextService } from "@services/hero-context/hero-context.service";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
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
    RouterModule,
    PercentPipe,
    MatTooltip,
    MatButtonModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-list.html",
  styleUrl: "./hero-list.scss",
})
export class HeroList implements OnInit {
  displayedColumns: string[] = ["name", "alias", "powerLevel", "actions"];
  searchControl = new FormControl("");
  pageSize = 10;
  pageIndex = 0;

  private heroService = inject(HeroContextService);
  private dialog = inject(HeroDialogService);

  private searchTerm = signal("");

  filteredHeroes = computed(() => {
    const heroes = this.heroService.getHeroes();
    const term = this.searchTerm().toLowerCase();

    if (!term) return heroes;

    return heroes.filter(
      (hero) =>
        hero.name.toLowerCase().includes(term) ||
        (hero.alias && hero.alias.toLowerCase().includes(term))
    );
  });

  totalHeroes = computed(() => this.filteredHeroes().length);

  pagedHeroes = computed(() => {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredHeroes().slice(startIndex, startIndex + this.pageSize);
  });

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchTerm.set(value || "");
        this.pageIndex = 0;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  openHeroDetail(hero: Hero): void {
    this.dialog.openDetail({
      hero,
      title: `Hero Details: ${hero.name}`,
    });
  }

  getPowerLevelColor(level: number = 0): string {
    if (level >= 80) return "warn";
    if (level >= 50) return "accent";
    return "primary";
  }

  editHero(hero: Hero): void {
    this.dialog.openEdit({
      hero,
      title: `Edit Hero: ${hero.name}`,
    });
  }

  deleteHero(hero: Hero): void {
    const dialogRef = this.dialog.openDelete({
      hero,
      title: `Delete Hero: ${hero.name}`,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.heroService.deleteHero(hero.id);
      }
    });
  }

  openAddHeroDialog(): void {
    this.dialog.openAddHero();
  }
}
