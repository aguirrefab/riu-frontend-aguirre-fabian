import { render } from "@testing-library/angular";
import { HomePage } from "./home-page";

describe(`${HomePage.name}`, () => {
  it("should render the home page container", async () => {
    const { container } = await render(HomePage);
    const homePageDiv = container.querySelector(".home-page");
    expect(homePageDiv).toBeTruthy();
  });

  it("should display the title 'Heroes Dashboard'", async () => {
    const { getByText } = await render(HomePage);
    expect(getByText("Heroes Dashboard")).toBeTruthy();
  });

  it("should render the app-hero-list component", async () => {
    const { container } = await render(HomePage);
    const heroList = container.querySelector("app-hero-list");
    expect(heroList).toBeTruthy();
  });
});
