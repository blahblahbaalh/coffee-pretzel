import styles from "./avatarHead.module.css"
import * as peeps from "../../../assets/person";

const peepDefaultMsg = [
    "What are we doing with our lives?",
    "Pyjamas and pretzel",
    "ARRRR! Let's get productivity-krack'n",
    "Meep meep",
    "EN GARDE!",
    "I'm a hipster",
    "Life is coffee. Coffee is life. Be my last love.",
    "Bob, no ROOOSS",
    "Stay focus!",
    "Smile and sip, boys, just smile and sip",
    "Why did I bring this with me?",
    "Taking off my glasses make me a whole new person."
]

// This is a floating head button bottom RHS of screen
function AvatarHead({ src, peep, message, notification = 0, className, ...props }) {
    const peepNum = peep.slice(4, 6);
   return(
    <button className={`${styles.button} ${styles.className}`} {...props}>
    <img src={peeps[peep]} alt="avatar" />
    <p>
        {message || peepDefaultMsg[peepNum -1] }
        {notification > 0 && <sup>1</sup>}
    </p>
    </button>
   )
}

export default AvatarHead;