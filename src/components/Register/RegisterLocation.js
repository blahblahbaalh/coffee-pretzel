import { useEffect } from "react";
import menu1 from "../../assets/menu/menu-1.png";
import ButtonOk from "../UI/ButtonOk/ButtonOk";
import { cafeLocationList } from "../../data/locationList";
import useInput from "../../hooks/use-input";

import styles from "./register.module.css";


function RegisterPageLocation({onSetInputs, id, inputs}) {
  //(A) use-input.js custom hooks
  const {
    input,
    isTouched,
    inputHasError,
    handleInput,
  } = useInput();
  

  //(B) Parent<--Child: To pass the final selected value to parent RegisterPageDrinks
  const handleOk = () => {
    onSetInputs(id, input); 
  }

  //(C) Parent-->Child: To pass any existing initial value to child if user revisit the form
  useEffect(() => {
    handleInput(inputs);
  }, []);

  ///(D) Dynamic CSS .selected
  const cssSelected = (each) => (each.id === input) ? styles.selected : "";

  return (
    <>
    <div className={styles.location}>
      <img src={menu1} alt="location-asset" />
      <ul>
        {cafeLocationList.map((each) => (
          <li className={cssSelected(each)} key={each.id}>
            <input type="radio" id={each.id} name="location" value={each.id} onChange={(e) => handleInput(e.target.value)}/>
            <label htmlFor={each.id} className={`${cssSelected(each)} ${styles.hover}`}>{each.location}</label>
          </li>
        ))}
      </ul>
    </div>
    <ButtonOk className={styles.buttonok} type="button" onClick={handleOk} disabled={!isTouched || inputHasError} />
    </>
  );
}

export default RegisterPageLocation;
