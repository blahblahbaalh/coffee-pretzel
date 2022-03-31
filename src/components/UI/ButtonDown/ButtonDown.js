import styles from "./buttonDown.module.css";


function ButtonDown({onClick, className, type, children, ...props}){
    return(
        <button className={`${styles.button} ${className}`} onClick={onClick} type={type} {...props}><span>{children}</span></button>
    )
}

export default ButtonDown