import { Routes } from "@angular/router";
import { MainLayout } from "./layout/main-layout/main-layout";

export const routes: Routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./features/home/pages/home-page/home-page").then(
            (m) => m.HomePage
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
