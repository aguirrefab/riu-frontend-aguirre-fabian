import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { HeroDialogDetail } from "@features/home/components/hero-dialog-detail/hero-dialog-detail";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Injectable({
  providedIn: "root",
})
export class HeroDialogService {
  readonly dialog = inject(MatDialog);

  open(hero: HeroDialogData) {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.minWidth = "300px";
    config.maxWidth = "600px";
    config.data = hero;
    config.width = "600px";

    return this.dialog.open(HeroDialogDetail, config);
  }

  close(): void {
    this.dialog.closeAll();
  }
}
