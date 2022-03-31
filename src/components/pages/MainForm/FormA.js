import styles from "./mainForm.module.css";
import * as peeps from "../../../assets/person";
import Button from "../../UI/Button/Button";


function FormA({onSelect, onNavigateNextForm, isDisabled}) {
  return (
    <div className={styles.formA}>
      <div className={styles.peeps}>
        {Array.from(Array(12)).map((each, index) => (
          <img src={peeps["peep" + (index+1)]} alt={`peep` + index} onClick={() => onSelect("peep" + (index+1), "FormA")}/>
        ))}
      </div>
      <Button 
        type="button" 
        className={styles.button} 
        onClick={() => onNavigateNextForm()}
        disabled={isDisabled}
        >Enter Cafe</Button>
    </div>
  );
}

export default FormA;
