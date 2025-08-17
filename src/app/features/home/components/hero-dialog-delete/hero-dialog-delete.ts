import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Component({
  selector: "app-hero-dialog-delete",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: "./hero-dialog-delete.html",
  styles: [
    `
      main {
        padding: 20px;
      }
    `,
  ],
})
export class HeroDialogDelete {
  private readonly dialogRef = inject(MatDialogRef<HeroDialogDelete>);
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
