import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";

import styles from "../Ratings.module.scss";
import { RatingInterface } from "../interfaces/rating.interface";
import ratingsService from "../ratings.service";
import { RatingListInterface } from "../interfaces/rating-list.interface";
import menuMealService from "../../menu-meal/menu-meal.service";

const RatingsList = ({ renderRatingsList, setRenderRatingsList, mealId, date }: RatingListInterface) => {
  const [ratings, setRatings] = useState<RatingInterface[]>([]);

  const getMenuMealId = async () => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = newDate.toLocaleDateString("en-CA", options).replace(/\//g, "-");
    const res = await menuMealService.httpGetByMenuIdAndDate(mealId, formattedDate);
    if (res) {
      await getRatingByMealId(res.id);
      return;
    }
    setRatings([]);
  };

  const getRatingByMealId = async (menuMealId: number) => {
    const res = await ratingsService.httpGetRatingByMenuMealId(menuMealId);
    if (res) {
      setRatings(res);
      return;
    }
    setRatings([]);
  };

  useEffect(() => {
    getMenuMealId();
  }, []);

  useEffect(() => {
    if (renderRatingsList) {
      getMenuMealId();
      setRenderRatingsList(false);
    }
  }, [renderRatingsList]);

  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  };

  return (
    <>
      <h2>Comentários ({ratings.length})</h2>
      {ratings.map((rating) => (
        <section key={rating.id} className={styles.comments}>
          <div className={styles.comments__header}>
            <article className={styles.comments__header__user}>
              <img className={styles["img-user"]} src={`https://ui-avatars.com/api/?name=${rating.username}`} alt={`${rating.username} avatar`} />
              <span>{rating.username}</span>
            </article>
            <span>{formatDate(rating.createdAt)}</span>
          </div>
          <Rating name="simple-controlled" value={rating.stars} readOnly />
          <span>{rating.message}</span>
        </section>
      ))}
    </>
  );
};

export default RatingsList;
