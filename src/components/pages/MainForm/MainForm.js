import styles from "./mainForm.module.css";
import logo3 from "../../../assets/logo/logo-3.png";
import FormA from "./FormA";
import Button from "../../UI/Button/Button";

function MainForm(){
    
    return(
        <section className={styles.mainForm}>
            <img src={logo3} alt="Coffee&Pretzel" />
            <h2>Pick your character</h2>
            <FormA />
            <Button className={styles.button}>Enter Cafe</Button>
        </section>
    )
}

export default MainForm;