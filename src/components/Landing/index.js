import { useState, useRef, useContext } from "react";
import useInput from "../../hooks/use-input";
import Carousel from "../UI/Carousel/Carousel";
import ButtonDown from "../UI/ButtonDown/ButtonDown";
import FormLayout from "../Layout/FormLayout/FormLayout";
import * as img from "../../assets/landing";
import {peeps} from "../../assets/person";
import { UserContext, USER_ACTIONS } from "../../store/user-context";


import styles from "./landing.module.css";
import { useNavigate } from "react-router";

/**
 * LandingPage consists of 2 sections - Carousel Header and Form Avatar section
 * Only upon the last carousel header will (1) form (2) ButtonDown appear
 * ButtonDown click scrolls down to form section
 * 
 */
function LandingPage(){
    //(A) STATES
    const [ isLast, setIsLast ] = useState(false);
    const scrollRef = useRef(null);
    const ctx = useContext(UserContext);
    const navigate = useNavigate();
    const {
            input,
            error,
            inputIsValid,
            inputHasError,
            handleError,
            handleInput,
            handleIsTouched,
        } = useInput();

    // ==============================HEADER CAROUSEL LOGIC========================================//
    //(B) Sliders content for header carousel
    const carouselArray = [
        {
            img: img.location,
            h1: <h1>Jet <br/> set to various cafe locations from all around the world!</h1>,
        },
        {
            img: img.pomodoro,
            h1: <h1>Grab <br/> a drink and set a pomodoro to complete your task. </h1>,
        },
        {
            img: null,
            h1: <h1>Get<br/> motivated and focus with others!</h1>,
        }
    ];

    //(C) Parent<--Child, set isLastItem in carousel to true, and is then used to add animateCSS class and ButtonDown appear
    const onSetIsLast = () => setIsLast(true);

    //(D) ButtonDown onClick handler will scrollpage to form section
    const onClickJoinNow = () => {
        scrollRef.current.scrollIntoView({
            behavior: "smooth"
        });//!<-- TN: window.scrollTo(formRef) does not work in react
    }

    // ==============================FORM AVATAR LOGIC========================================//
    //(E) FORM VALIDITY
    let formIsValid = false;
    if ( inputIsValid ) { //<-- pass in all form input validity here
        formIsValid = true;
    }

    //(F) FORM SUBMISSION HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        if (!formIsValid){
            handleError("Click on an avatar to begin!");
            return;
        }
        console.log("result", +input +1);
        ctx.dispatchUser({type: USER_ACTIONS.SET_AVATAR, payload: {userAvatar: "peep" + (+input + 1)}});
        navigate("/register");
    }

    //=======================================================================================//


    return(
        <>
        
        {/****  HEADER CAROUSEL SECTION*****/}
        <header className={styles.header}>
        <Carousel carouselArray={carouselArray} className={styles.carousel} onSetIsLast={onSetIsLast}/>
        <div className={`${styles.shopfront} ${isLast && styles.animate}`}>
            <img className={styles.shopfront__shell} src={img.shopfront} alt="shop" />
            <img className={styles.shopfront__logo} src={img.shopfrontCircle} alt="logo" />
        </div>
        {isLast && <ButtonDown onClick={onClickJoinNow} className={styles.buttonDown} type="button"> Join Now </ButtonDown>}
        </header>

        {/****  FORM AVATAR SECTION*****/}
        { isLast && 
        <FormLayout ref={scrollRef} disabled={inputHasError} handleSubmit={handleSubmit} h1="Pick Your Character" buttonText="Proceed" error={error}>
            <div className={styles.avatars}>
            {Array.from(Array(12)).map((_, index) => (
                <div key={index}>
                <input type="radio" id={index} name="avatar" value={index} onChange={(e) => handleInput(e.target.value)} onBlur={handleIsTouched}/>
                <label htmlFor={index} className={(+index === +input) ? styles.selectedLabel : ""}>
                    <img src={peeps["peep" + (index+1)]} alt={`peep` + index}/>
                </label>
                </div>
            ))}
            </div>
         </FormLayout>
        }
        </>
    )
}

export default LandingPage;