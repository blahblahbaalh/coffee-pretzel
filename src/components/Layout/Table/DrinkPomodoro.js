import { useEffect, useState } from "react";
import {emptyDrink, occupiedDrink } from "../../../assets/drinks/index";


import styles from "./table.module.css";

function DrinkPomodoro({drink}){
    //0. states
    const initialTiming = 10;//seconds
    const [ timer, setTimer ] = useState(initialTiming);
    const [ isTimerActive, setIsTimerActive ] = useState(false);
    let height = timer/initialTiming * 100;


    //1. get empty drink + occupied drink
    const isHot = drink.includes("hot");
    const selectedEmptyDrink = isHot ? emptyDrink.hotEmpty : emptyDrink.coldEmpty;
    const selectedDrink = occupiedDrink[drink];

    //2. 
    const handleTogglePomodoro = () => setIsTimerActive(prev => !prev)

    //! 3. OBSERVE how setTimeout is used for the pomodoro timer 
    useEffect(() => {
        if (!isTimerActive) return;
        if (timer < 1){
            setIsTimerActive(false);
            setTimer(initialTiming)
        }

        const timeoutPointer = setTimeout(() => {
            setTimer(prev => prev -1)
        }, 1000)

        return () => clearTimeout(timeoutPointer)
    }, [timer, isTimerActive]);
    

    
    return(
       <div className={`${styles.coffeeContainer} ${isHot? styles.hot : styles.cold}`} onClick={handleTogglePomodoro}>
        <p>{timer}timer and {height}% height</p>
        <img className={styles.coffeeEmpty} src={selectedEmptyDrink} alt={selectedEmptyDrink} />
        <div className={styles.coffeeOccupiedWrapper} style={{height: height+"%"}}>
            <img className={styles.coffeeOccupied} src={selectedDrink} alt={selectedDrink} />
        </div>
       </div>
    )
}

export default DrinkPomodoro;