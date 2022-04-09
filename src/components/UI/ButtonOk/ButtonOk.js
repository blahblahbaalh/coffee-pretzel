import styles from "./buttonok.module.css";
import * as img from "../../../assets/doodles";

function ButtonOk({ type, onClick, disabled, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className} ${disabled ? styles.disabled : styles.enabled} `}
    >
      <img src={img.ok} alt="ok" />
    </button>
  );
}

export default ButtonOk;