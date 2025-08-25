import { UpperCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroDialogData } from "@shared/models/hero-dialog.model";

@Component({
  selector: "app-hero-dialog-delete",
  standalone: true,
  imports: [DialogContainer, UpperCasePipe],
  templateUrl: "./hero-dialog-delete.html",
})
export class HeroDialogDelete {
  private readonly dialogRef = inject(MatDialogRef<HeroDialogDelete>);
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
