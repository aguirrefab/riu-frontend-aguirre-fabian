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
            (c) => c.HomePage,
          ),
      },
      {
        path: "not-found",
        loadComponent: () =>
          import("./features/not-found/pages/not-found").then(
            (c) => c.NotFound,
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];
