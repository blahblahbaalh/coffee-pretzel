import styles from "./avatarHead.module.css";
import { peeps } from "../../../assets/person";
import { peepDefaultMsg } from "../../../data/peepsMsgList";

// Layout for Floating avatar head bottom RHS of screen
function AvatarHead({ peep, message, notification = 0, className, ...props }) {
  const peepNum = peep.slice(4, 6);
  return (
    <div className={styles.avatarHead}>
      <p className={styles.text}>{message || peepDefaultMsg[peepNum - 1]}</p>
      <sup>{notification || 0}</sup>
      <button className={`${styles.button} ${className}`} {...props}>
        <img src={peeps[peep]} alt="avatar" />
      </button>
    </div>
  );
}

export default AvatarHead;
