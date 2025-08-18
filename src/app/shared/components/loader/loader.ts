import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-loader",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinnerModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content class="loader-container">
        <mat-progress-spinner
          class="loader"
          mode="indeterminate"
          diameter="40"
          strokeWidth="5"
        ></mat-progress-spinner>
        <h5>Getting heroes...</h5>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 150px;
        font-style: italic;
      }
    `,
  ],
})
export class Loader {}
