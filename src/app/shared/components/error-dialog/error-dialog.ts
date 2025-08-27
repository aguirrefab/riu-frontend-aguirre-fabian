import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DialogContainer } from "../dialog-container/dialog-container";

@Component({
  selector: "app-error-dialog",
  imports: [DialogContainer, MatCardModule, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./error-dialog.html",
  styleUrl: "./error-dialog.scss",
})
export class ErrorDialog {
  onRetryAction() {
    window.location.reload();
  }
}
