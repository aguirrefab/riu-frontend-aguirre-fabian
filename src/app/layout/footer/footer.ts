import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="app-footer">
      <p>&copy; 2025 RIU Frontend Challenge - Aguirre Fabian</p>
    </footer>
  `,
  styles: [
    `
      .app-footer {
        background-color: #f5f5f5;
        padding: 1rem;
        text-align: center;
        border-top: 1px solidrgb(210, 172, 172);
      }
    `,
  ],
})
export class Footer {}
