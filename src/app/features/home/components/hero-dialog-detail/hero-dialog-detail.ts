import { PercentPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { HeroDialogData } from "../../../../shared/models/hero-dialog.model";

@Component({
  selector: "app-hero-dialog-detail",
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    PercentPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./hero-dialog-detail.html",
  styleUrl: "./hero-dialog-detail.scss",
})
export class HeroDialogDetail {
  constructor(@Inject(MAT_DIALOG_DATA) public data: HeroDialogData) {}
}
