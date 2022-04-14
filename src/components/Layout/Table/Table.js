import styles from "./table.module.css";
import plant from "../../../assets/table/plant.png";
import {emptyDrink, occupiedDrink } from "../../../assets/drinks/index";
import { useContext } from "react";
import { UserContext } from "../../../store/user-context";

// Layout for Table + dynamic youtube iframe + drinks
function Table({className}) {
  const ctx = useContext(UserContext);
  console.log("ctx", ctx);

  const isHot = ctx.user.cafe.drink.includes("hot");
  //1. get empty drink + occupied drink
  const selectedEmptyDrink = isHot ? emptyDrink.hotEmpty : emptyDrink.coldEmpty;
  const selectedDrink = occupiedDrink[ctx.user.cafe.drink];


  return (
    <div className={`${styles.table} ${className}`}>
      {ctx.user.cafe.location && (
        <div className={styles.window}>
          <iframe
            className={styles.youtube}
            src={`https://www.youtube-nocookie.com/embed/${ctx.user.cafe.location}?controls=0&autoplay=1&controls=0&disablekb=1&mute=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowfullscreen
          ></iframe>
          <div className={styles.glass} />
        </div>
      )}
      <img className={styles.plant} src={plant} alt="plant-img" />
      <img className={styles.coffee} src={selectedDrink} alt="icecoffee-img" />
    </div>
  );
}

export default Table;
