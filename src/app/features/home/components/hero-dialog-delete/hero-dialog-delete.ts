import { UpperCasePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogContainer } from "@shared/components/dialog-container/dialog-container";
import { HeroDialogData } from "@shared/models/hero-dialog.model";
import { HeroContextService } from "../../../../core/services/hero-context/hero-context.service";

@Component({
  selector: "app-hero-dialog-delete",
  standalone: true,
  imports: [DialogContainer, UpperCasePipe],
  templateUrl: "./hero-dialog-delete.html",
})
export class HeroDialogDelete {
  private readonly dialogRef = inject(MatDialogRef<HeroDialogDelete>);
  private readonly heroContext = inject(HeroContextService);
  readonly data = inject<HeroDialogData>(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.heroContext.deleteHero(this.data.hero.id);
    this.onCancel();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
