import { SortDirection } from "@angular/material/sort";
import { SortType } from "../types/sort-by.type";

export interface HeroesRequest {
  offset: number;
  limit: number;
  searchBy: string;
  sortOrder?: SortDirection;
  sortBy?: SortType;
}
