import { inject, Injectable } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { HeroDialogDelete } from "@features/home/components/hero-dialog-delete/hero-dialog-delete";
import { HeroDialogDetail } from "@features/home/components/hero-dialog-detail/hero-dialog-detail";
import { HeroDialogEdit } from "@features/home/components/hero-dialog-edit/hero-dialog-edit";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Injectable({
  providedIn: "root",
})
export class HeroDialogService {
  private readonly dialog = inject(MatDialog);

  private getBaseConfig(data: HeroDialogData): MatDialogConfig {
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

  openDetail(hero: HeroDialogData) {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogDetail, config);
  }

  openEdit(hero: HeroDialogData) {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogEdit, config);
  }

  openDelete(hero: HeroDialogData): MatDialogRef<HeroDialogDelete, boolean> {
    const config = this.getBaseConfig(hero);
    return this.dialog.open(HeroDialogDelete, config);
  }

  close(): void {
    this.dialog.closeAll();
  }
}
