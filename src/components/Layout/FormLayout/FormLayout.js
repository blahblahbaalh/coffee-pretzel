import { forwardRef } from "react";

import Button from "../../UI/Button/Button";
import styles from "./formlayout.module.css";
import logo from "../../../assets/logo/logo-3.png";

/**
 * FormLayout is a wrapper with <form></form> + Submit Button
 */
const FormLayout =  forwardRef((props, ref) => {
    const {disabled, handleSubmit, children , h1, buttonClassName, className, buttonText = null, error} = props;

    return(
        <form ref={ref} onSubmit={handleSubmit} className={`${styles.form} ${className} center`}>
            <div className={styles.form__header}>
            <img className={styles.logo} src={logo} alt="coffee-pretzel-logo" />
            <h1 className={styles.title}>{h1}</h1>
            </div>
            {children}
            {error !=="" && <small className={styles.error}>{error}</small>}
            {!!buttonText && <Button type="submit" className={`${styles.button} ${buttonClassName}`} disabled={disabled}>{buttonText}</Button>}
        </form>
    )
});

export default FormLayout;