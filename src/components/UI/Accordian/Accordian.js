import { useEffect, useState } from "react";
import styles from "./accordian.module.css";

/**
 * UI for Single Accordian
 */
function Accordian({ onSetSelectedAcc, selectedAcc, id, disabled, accordianHeader, className, children, setClose }) {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
      onSetSelectedAcc(id);
      setShow(prev => !prev);
    };

    useEffect(() => {
      (selectedAcc === id) && setShow(true);
      (selectedAcc !== id) && setShow(false);
    }, [selectedAcc, id])

  return (
    <>
      <button
        className={`${styles.accordianHeader} ${className}`}
        onClick={handleToggle}
        type="button"
        disabled={disabled}
      >
        {accordianHeader}
      </button>
      {show && <section >{children}</section>}
    </>
  );
}

export default Accordian;
