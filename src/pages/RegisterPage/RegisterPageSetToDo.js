import Todo from "../../components/Layout/Todo/Todo";
import ButtonOk from "../../components/UI/ButtonOk/ButtonOk";

import styles from "./registerpage.module.css";

function RegisterPageSetTodo({onSetInputs, id}){

    const handleClick = () => {
        onSetInputs(id, {}); //sending a blank as Todos managed by global state
    }

    return(
        <>
        <Todo />
        <ButtonOk className={styles.buttonok} type="button" onClick={handleClick} />
        </>
    )
}

export default RegisterPageSetTodo;