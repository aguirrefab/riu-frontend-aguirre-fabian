import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-not-found",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatProgressSpinnerModule, MatCardModule, MatIcon],
  template: `
    <mat-card-content class="not-found-container">
      <section>
        <mat-icon class="not-found-icon">search_off</mat-icon>
        <h1 class="text-3xl font-bold">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go back home</a>
      </section>
    </mat-card-content>
  `,
  styles: [
    `
      .not-found-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .not-found-icon {
        font-size: 48px;
        width: 48px;
        height: auto;
        color: #f86666ff;
      }
    `,
  ],
})
export class NotFound {}
