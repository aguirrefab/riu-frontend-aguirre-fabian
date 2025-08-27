import { SortDirection } from "@angular/material/sort";
import { SortType } from "../types/sort-by.type";

export interface SortAction {
  column: SortType;
  sortOrder: SortDirection;
}
