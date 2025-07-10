import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="app-header">
      <h1>RIU Frontend Challenge</h1>
    </header>
  `,
  styles: [
    `
      .app-header {
        background-color: #e6002a;
        color: white;
        padding: 1rem;
        text-align: center;
      }
    `,
  ],
})
export class Header {}
