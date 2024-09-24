import React from "react";
import { Rating } from "@mui/material";

import styles from "../Ratings.module.scss";

const RatingsList = () => {
  const generateImageBasedName = () => {};

  return (
    <>
      <section className={styles.comments}>
        <div className={styles.comments__header}>
          <article className={styles.comments__header__user}>
            <img className={styles["img-user"]} src={`https://ui-avatars.com/api/?name=${"wilamis aviz"}`}></img>
            <span>Nome</span>
          </article>
          <span>1 hora atrás</span>
        </div>
        <Rating name="simple-controlled" value={1} readOnly />
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique necessitatibus dolore, qui commodi dolores id officiis fugiat natus neque accusantium totam excepturi
          fugit quibusdam placeat dolor exercitationem obcaecati rem voluptas.
        </span>
      </section>
      <section className={styles.comments}>
        <div className={styles.comments__header}>
          <article className={styles.comments__header__user}>
            <img className={styles["img-user"]} src={`https://ui-avatars.com/api/?name=${"wilamis aviz"}`}></img>
            <span>Nome</span>
          </article>
          <span>1 hora atrás</span>
        </div>
        <Rating name="simple-controlled" value={1} readOnly />
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique necessitatibus dolore, qui commodi dolores id officiis fugiat natus neque accusantium totam excepturi
          fugit quibusdam placeat dolor exercitationem obcaecati rem voluptas.
        </span>
      </section>
      <section className={styles.comments}>
        <div className={styles.comments__header}>
          <article className={styles.comments__header__user}>
            <img className={styles["img-user"]} src={`https://ui-avatars.com/api/?name=${"wilamis aviz"}`}></img>
            <span>Nome</span>
          </article>
          <span>1 hora atrás</span>
        </div>
        <Rating name="simple-controlled" value={1} readOnly />
        <span></span>
      </section>
      <section className={styles.comments}>
        <div className={styles.comments__header}>
          <article className={styles.comments__header__user}>
            <img className={styles["img-user"]} src={`https://ui-avatars.com/api/?name=${"wilamis aviz"}`}></img>
            <span>Nome</span>
          </article>
          <span>1 hora atrás</span>
        </div>
        <Rating name="simple-controlled" value={1} readOnly />
        <span></span>
      </section>
    </>
  );
};

export default RatingsList;
