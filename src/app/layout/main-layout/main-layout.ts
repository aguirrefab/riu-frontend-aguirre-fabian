import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Content } from "../content/content";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [Header, Content, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <app-content />
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: grid;
        min-height: 100dvh;
        grid-template-rows: auto 1fr auto;
      }
    `,
  ],
})
export class MainLayout {}
