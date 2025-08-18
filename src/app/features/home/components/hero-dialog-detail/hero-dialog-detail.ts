import { PercentPipe, UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatProgressBar } from "@angular/material/progress-bar";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { HeroDialogService } from "@src/app/features/home/services/hero-dialog/hero-dialog-service";

@Component({
  standalone: true,
  selector: "app-hero-dialog-detail",
  imports: [DialogContainer, MatProgressBar, PercentPipe, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-dialog-detail.html",
})
export class HeroDialogDetail {
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);
  private readonly heroDialog = inject(HeroDialogService);

  closeDialog(): void {
    this.heroDialog.close();
  }
}
