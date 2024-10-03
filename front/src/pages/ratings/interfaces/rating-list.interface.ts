import { Dispatch, SetStateAction } from "react";

export interface RatingListInterface {
  renderRatingsList: boolean;
  setRenderRatingsList: Dispatch<SetStateAction<boolean>>;
  mealId: number;
  date: Date;
}
