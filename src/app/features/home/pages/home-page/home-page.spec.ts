import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroList } from "../../components/hero-list/hero-list";
import { HomePage } from "./home-page";

describe(`${HomePage.name}`, () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HeroList],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the home page component", () => {
    expect(component).toBeTruthy();
  });

  it("should have a title", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Heroes Dashboard",
    );
  });

  it("should render the hero list component", () => {
    const heroList =
      fixture.debugElement.nativeElement.querySelector("app-hero-list");
    expect(heroList).toBeTruthy();
  });
});
