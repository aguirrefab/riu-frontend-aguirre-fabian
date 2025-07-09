import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-content",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .app-content {
        flex: 1;
        padding: 2rem;
      }
    `,
  ],
})
export class ContentComponent {}
