import { inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import { HeroDialogData } from "../../../shared/models/hero-dialog.model";
import { HeroDialogDetail } from "../components/hero-dialog-detail/hero-dialog-detail";

@Injectable()
export class HeroDialogService {
  readonly dialog = inject(MatDialog);

  async openHeroDialogDetail(
    hero: HeroDialogData
  ): Promise<HeroDialogData | undefined> {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass = "hero-dialog-detail";
    config.data = hero;
    config.width = "600px";

    const returnDialog$ = this.dialog
      .open(HeroDialogDetail, config)
      .afterClosed();
    return firstValueFrom(returnDialog$);
  }
}
