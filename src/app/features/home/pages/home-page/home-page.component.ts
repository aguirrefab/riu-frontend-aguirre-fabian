import { Component } from "@angular/core";

@Component({
  selector: "app-home-page",
  standalone: true,
  template: `
    <div class="home-page">
      <h1>Welcome to RIU Frontend Challenge</h1>
      <p>This is the home page of the application.</p>
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
export class HomePageComponent {}
