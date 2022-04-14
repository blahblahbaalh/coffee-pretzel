import styles from "./avatarHead.module.css"
import {peeps} from "../../../assets/person";
import { peepDefaultMsg } from "../../../data/peepsMsgList";


// Layout for Floating avatar head bottom RHS of screen
function AvatarHead({ peep, message, notification = 0, className, ...props }) {
const peepNum = peep.slice(4, 6);
   return(
    <div className={styles.avatarHead}>
    <button className={`${styles.button} ${className}`} {...props}>
    <img src={peeps[peep]} alt="avatar" />
    </button>
    <sup>{notification || 0}</sup>
     <p className={styles.text}>
     {message || peepDefaultMsg[peepNum -1] }
    </p>
    </div>
   )
}

export default AvatarHead;