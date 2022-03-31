import styles from "./avatarHead.module.css"
import * as peeps from "../../../assets/person";

// This is a floating head button bottom RHS of screen
function AvatarHead({ src, peep, message, notification = 0, className, ...props }) {
   return(
    <button className={`${styles.button} ${styles.className}`} {...props}>
    <img src={peeps[peep]} alt="avatar" />
    <p>
        {message || "WHOO IS THAT LOOKING BACK AT ME!"}
        {notification > 0 && <sup>1</sup>}
    </p>
    </button>
   )
}

export default AvatarHead;