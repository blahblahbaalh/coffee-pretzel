import useInput from "../../hooks/use-input";
import ButtonOk from "../../components/UI/ButtonOk/ButtonOk";
import {cold, hot} from "../../assets/drinks";

import styles from "./registerpage.module.css";
import { useEffect } from "react";


function RegisterPageDrinks({onSetInputs, id, inputs}){
    //(A) use-input.js custom hooks
    const {
        input,
        isTouched,
        inputIsValid,
        handleInput,
    } = useInput();

    //(B) Parent<--Child: To pass the final selected value to parent RegisterPageDrinks
    const handleOk = () =>{
        onSetInputs(id, input);
    }

    //(C) Parent-->Child: To pass any existing initial value to child if user revisit the form
    useEffect(() => {
        inputs && handleInput(inputs);
    }, []);

    ///(D) Dynamic CSS .selected
     const cssSelected = (key) => (key === input) ? styles.selected : "";
    
    return(
        <>
        <div className={styles.drinks}>
        {
            //Mapping Obj-->Array of hot drinks where key(drinkName):value(svg) and wrapping them in label+input
            Object.keys(hot).map(key => (
                <>
                <label className={`${cssSelected(key)} ${styles.hover}`} htmlFor={key}>
                    <img src={hot[key]} alt={key} />
                    <p>{key.slice(3)}</p>
                </label>
                <input id={key} type="radio" value={key} name="drink" onChange={(e) => handleInput(e.target.value)}/>
                </>
            ))
        }
        {
            //Mapping Obj-->Array of cold drinks where key(drinkName):value(svg) and wrapping them in label+input
            Object.keys(cold).map(key => (
                <>
               <label className={`${cssSelected(key)} ${styles.hover}`} htmlFor={key}>
                <img  src={cold[key]} alt={key} />
                <p>{key.slice(4)}</p>
               </label>
               <input id={key} type="radio" value={key} name="drink" onChange={(e) => handleInput(e.target.value)}/>
               </>
           ))
        }
        </div>
        <ButtonOk type="button" onClick={handleOk} disabled={!isTouched || !inputIsValid} className={styles.buttonok}></ButtonOk>
        </>
    )
}

export default RegisterPageDrinks;