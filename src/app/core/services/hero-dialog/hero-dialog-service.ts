import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddHeroDialog } from "@features/home/components/add-hero-dialog/add-hero-dialog";
import { HeroDialogDelete } from "@features/home/components/hero-dialog-delete/hero-dialog-delete";
import { HeroDialogDetail } from "@features/home/components/hero-dialog-detail/hero-dialog-detail";
import { HeroDialogEdit } from "@features/home/components/hero-dialog-edit/hero-dialog-edit";
import { ErrorDialog } from "@shared/components/error-dialog/error-dialog";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Injectable({
  providedIn: "root",
})
export class HeroDialogService {
  private readonly dialog = inject(MatDialog);

  private getBaseConfig(data?: HeroDialogData): MatDialogConfig {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.minWidth = "300px";
    config.maxWidth = "600px";
    config.width = "600px";
    config.data = data;
    return config;
  }

  openDetailHero(hero: HeroDialogData) {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogDetail, config);
  }

  openEditHero(hero: HeroDialogData) {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogEdit, config);
  }

  openDeleteHero(hero: HeroDialogData) {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogDelete, config);
  }

  openAddHero() {
    const config = this.getBaseConfig();
    return this.dialog.open(AddHeroDialog, config);
  }

  openErrorDialog() {
    const config = this.getBaseConfig();
    return this.dialog.open(ErrorDialog, config);
  }
}
