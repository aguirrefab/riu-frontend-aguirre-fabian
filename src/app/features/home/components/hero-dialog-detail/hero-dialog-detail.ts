import { PercentPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatProgressBar } from "@angular/material/progress-bar";
import { HeroDialogService } from "@services/hero-dialog/hero-dialog-service";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Component({
  standalone: true,
  selector: "app-hero-dialog-detail",
  imports: [
    MatDialogModule,
    MatButton,
    MatCardModule,
    MatProgressBar,
    PercentPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-dialog-detail.html",
  styleUrl: "./hero-dialog-detail.scss",
})
export class HeroDialogDetail {
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);
  private readonly heroDialog = inject(HeroDialogService);

  closeDialog(): void {
    this.heroDialog.close();
  }
}
