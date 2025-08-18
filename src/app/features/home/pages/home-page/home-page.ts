import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeroList } from "../../components/hero-list/hero-list";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [HeroList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home-page">
      <h1>Heroes Dashboard</h1>
      <app-hero-list />
    </div>
  `,
  styles: [
    `
      .home-page {
        padding: 2rem;
        text-align: center;
      }
    `,
  ],
})
export class HomePage {}
