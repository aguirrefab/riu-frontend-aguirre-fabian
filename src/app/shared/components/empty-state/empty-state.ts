import { Component, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-empty-state",
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="empty-state-container">
      <mat-icon class="empty-state-icon">{{ icon() }}</mat-icon>
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
    </div>
  `,
  styleUrl: "./empty-state.scss",
})
export class EmptyStateComponent {
  title = input<string>("No results found");
  message = input<string>("Try adjusting your search or filters");
  icon = input<string>("search_off");
}
