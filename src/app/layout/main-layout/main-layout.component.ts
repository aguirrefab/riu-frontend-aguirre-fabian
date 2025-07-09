import { Component } from "@angular/core";
import { ContentComponent } from "../content/content.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [HeaderComponent, ContentComponent, FooterComponent],
  template: `
    <app-header />
    <app-content />
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class MainLayoutComponent {}
