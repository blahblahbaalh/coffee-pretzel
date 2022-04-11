import { useContext, useState } from "react";
import { UserContext } from "../../store/UserContextProvider";
import { peeps } from "../../assets/person";
import { arrow } from "../../assets/doodles";

import styles from "./registerpage.module.css";

function RegisterPageSignName({onSetInputs, id, inputs}){
    const ctx = useContext(UserContext);
    const [name, setName] = useState(inputs || "");

    const handleSubmitOnBlur = () => {
        name.trim() !== "" && onSetInputs(id, name)
    }

    return(
        <div className={styles.signContainer}>
        <h1 className={styles.signContainerH1}>NAME</h1>
        <img className={styles.imgArrow} src={arrow} alt="arrow" />
        <img className={styles.imgName} src={peeps[ctx.user.userAvatar] || peeps["peep1"]} alt="avatar" />
        <div className={styles.signHere}><span>&#10007; &#10007;</span>
        <input onBlur={handleSubmitOnBlur} onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Sign Here" />
        </div>
        </div>
    )
}

export default RegisterPageSignName;