import { UpperCasePipe } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { Hero } from "@shared/models/hero.model";

@Component({
  selector: "app-dialog-container",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule, UpperCasePipe],
  templateUrl: "./dialog-container.html",
  styleUrls: ["./dialog-container.scss"],
})
export class DialogContainer {
  title = input<string>();
  showSubmitButton = input<boolean>(false);
  submitLabel = input<string>();
  submitDisabled = input<boolean>(false);

  hero = input<Hero>();
  submitDialog = output<Hero>();

  onSubmit() {
    this.submitDialog.emit(this.hero()!);
  }
}
