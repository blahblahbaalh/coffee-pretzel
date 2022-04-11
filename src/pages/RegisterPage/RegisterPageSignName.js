import { useContext } from "react";
import { AuthContext } from "../../store/AuthContextProvider";
import { peeps } from "../../assets/person";
import { arrow } from "../../assets/doodles";

import styles from "./registerpage.module.css";

function RegisterPageSignName({onsetInputs, id, inputs}){
    const ctx = useContext(AuthContext);
    console.log("userAvatar", ctx.userAvatar);

    return(
        <div className={styles.signContainer}>
        <h1 className={styles.signContainerH1}>NAME</h1>
        <img className={styles.imgArrow} src={arrow} alt="arrow" />
        <img className={styles.imgName} src={peeps[ctx.userAvatar] || peeps["peep1"]} alt="avatar" />
        <div className={styles.signHere}><span>&#10007; &#10007;</span><input type="text" placeholder="Sign Here" /></div>

        </div>
    )
}

export default RegisterPageSignName;