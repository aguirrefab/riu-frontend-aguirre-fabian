import { SortDirection } from "@angular/material/sort";
import { Hero } from "../models/hero.model";
import { SortType } from "../types/sort-by.type";

export const sortHeroes = (
  heroes: Hero[],
  sortBy: SortType,
  sortOrder: SortDirection,
): Hero[] => {
  if (sortOrder === "") return heroes;

  return [...heroes].sort((a, b) => {
    let aValue: string | number = "";
    let bValue: string | number = "";

    switch (sortBy) {
      case "alias":
        aValue = a.alias ?? "";
        bValue = b.alias ?? "";
        break;
      case "powerLevel":
        aValue = a.powerLevel;
        bValue = b.powerLevel;
        break;
      default: // por name
        aValue = a.name;
        bValue = b.name;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }
  });
};
