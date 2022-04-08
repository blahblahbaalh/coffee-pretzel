import styles from "./paper.module.css";

function Paper({header, className, children, ...props}){
    return(
        <div className={`${styles.paper} ${className}`} {...props}>
            <header>
                {header}
            </header>
            <section >
                {children}
            </section>
        </div>
    )
}

export default Paper;