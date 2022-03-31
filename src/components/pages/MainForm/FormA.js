import styles from "./mainForm.module.css";
import * as peeps from "../../../assets/person";

function FormA() {
  return (
    <div className={styles.formA}>
      <div className={styles.peeps}>
        {Array.from(Array(12)).map((each, index) => (
          <img src={peeps["peep" + (index+1)]} alt={`peep` + index} />
        ))}
      </div>
    </div>
  );
}

export default FormA;
