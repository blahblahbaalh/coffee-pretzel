import { useContext, useState } from "react";
import AuthContext from "../../../store/AuthContextProvider";
import FormA from "./FormA";
import FormB from "./FormB";
import logo3 from "../../../assets/logo/logo-3.png";
import styles from "./mainForm.module.css";

function MainForm(){
    //1. useState to control which form to output on screen
    const [ currentForm, setCurrentForm ] = useState(0);

    const ctx = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onSelect = (input, formType) => {
        switch (formType){
            case "FormA": {return ctx.setAvatar(input);}
            default: return;
        }
        
    }
    
    const onNavigateNextForm = (current) => {
        if (currentForm === listOfForms.length) return;
        setCurrentForm(prev => prev+1);
    }

    const listOfForms = [
        <FormA onSelect={onSelect} onNavigateNextForm={onNavigateNextForm} isDisabled={!ctx.userAvatar}/>,
        <FormB onSelect={onSelect} onNavigateNextForm={onNavigateNextForm}/>,
    ];

    return(
        <section className={styles.mainForm}>
            <img src={logo3} alt="Coffee&Pretzel" />
            <h2>Pick your character</h2>
            <form onSubmit={handleSubmit}>
                {listOfForms[currentForm]}
            </form>
        </section>
    )
}

export default MainForm;