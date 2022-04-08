import styles from "./peopleform.module.css";
import * as peeps from "../../../assets/person";
import Button from "../UI/Button/Button";

// Form-PeopleForm.js is in used for /register 
// Component reused for form: avatar selection
function PeopleForm({onSelect, onNavigateForm, isDisabled}) {
  return (
    <form className={styles.form}>
      <div className={styles.peeps}>
        {Array.from(Array(12)).map((each, index) => (
          <img key={index} src={peeps["peep" + (index+1)]} alt={`peep` + index} onClick={() => onSelect("peep" + (index+1), "FormA")}/>
        ))}
      </div>
      <Button 
        type="button" 
        className={styles.button} 
        onClick={() => onNavigateForm()}
        disabled={isDisabled}
        >Enter Cafe</Button>
    </form>
  );
}

export default PeopleForm;
