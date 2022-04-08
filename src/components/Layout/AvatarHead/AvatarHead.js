import styles from "./avatarHead.module.css"
import * as peeps from "../../../assets/person";
import { peepDefaultMsg } from "../../../data/peepsMsg";


// Layout for Floating avatar head bottom RHS of screen
function AvatarHead({ src, peep, message, notification = 0, className, ...props }) {
    const peepNum = peep.slice(4, 6);
   return(
    <button className={`${styles.button} ${className}`} {...props}>
    <img src={peeps[peep]} alt="avatar" />
    <p>
        {message || peepDefaultMsg[peepNum -1] }
        {notification > 0 && <sup>1</sup>}
    </p>
    </button>
   )
}

export default AvatarHead;