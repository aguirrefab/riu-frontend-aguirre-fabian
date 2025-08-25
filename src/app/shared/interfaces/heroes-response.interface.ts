import { Hero } from "../models/hero.model";

export interface HeroesResponse {
  items: Hero[];
  total: number;
}
