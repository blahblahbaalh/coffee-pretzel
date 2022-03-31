import styles from "./button.module.css";

function Button({onClick, children, className, disabled, type, ...props }){
    return(
        <button className={`${styles.button} ${className}`} disabled={disabled} type={type} onClick={onClick} {...props}>{children}</button>
    )
}

export default Button;