import styles from "./table.module.css";
import plant from "../../../assets/common/plant.png";
import icecoffee from "../../../assets/common/icecoffee.png";

function Table(){
    return(
        <section className={styles.table}>
            <div className={styles.frame}>
            <img className={styles.plant} src={plant} alt="plant-img" />
            <img className={styles.coffee} src={icecoffee} alt="icecoffee-img" />
            </div>
        </section>
    )
}

export default Table;