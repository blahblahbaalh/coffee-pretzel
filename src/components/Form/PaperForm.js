import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import Paper from "../UI/Paper/Paper";
import styles from "./paperform.module.css";

//! WIP
// Form-PaperForm.js is in used for /register 
// Component reused for form: location, todos and drink selection
function PaperForm({isDisabled, onNavigateForm, optionsArray}) {
  const navigate = useNavigate();
  
  const handleClick = (e) => {

      // onNavigateForm={() => {navigate(1)}} disabled={!isTouched}
  }

  return (
    <Paper className={styles.paper}>
      {optionsArray.map((each) => (
        <div key={each.id}>
          <label htmlFor={each.id}>{each.location}</label>
          <input
            type="radio"
            id={each.id}
            name="form"
            value={each.id}
            onChange={handleClick}
          />
        </div>
      ))}
      <div>
        <Button type="button" onClick={() => {navigate(-1)}}> &#8701; </Button>
        <Button type="submit"> &#8702; </Button>
      </div>
    </Paper>
  );
}

export default PaperForm;
