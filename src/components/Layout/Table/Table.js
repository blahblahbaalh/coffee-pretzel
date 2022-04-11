import styles from "./table.module.css";
import plant from "../../../assets/common/plant.png";
import coldEmpty from "../../../assets/drinks/cold-empty.svg";
import { useContext } from "react";
import { UserContext } from "../../../store/UserContextProvider";

// Layout for Table: reused across all pages
//Dynamic window iframe
function Table() {
  const ctx = useContext(UserContext);

  return (
    <div className={styles.table}>
      {ctx.cafe.location && (
        <div className={styles.window}>
          <iframe
            className={styles.youtube}
            src={`https://www.youtube-nocookie.com/embed/${ctx.user.cafe.location.id}?controls=0&autoplay=1&controls=0&disablekb=1&mute=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowfullscreen
          ></iframe>
          <div className={styles.glass} />
        </div>
      )}
      <img className={styles.plant} src={plant} alt="plant-img" />
      <img className={styles.coffee} src={coldEmpty} alt="icecoffee-img" />
    </div>
  );
}

export default Table;
