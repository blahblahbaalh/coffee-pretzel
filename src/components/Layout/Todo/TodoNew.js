

import { useContext, useState } from "react";
import { TodoContext, ACTIONS } from "../../../store/todo-context";
import styles from "./todo.module.css";

function TodoNew(){
    //(B1) For new todo keystroke
    const [newTodo, setNewTodo ] = useState({ 
        todo: "",
        total: 1
    });
    const ctx = useContext(TodoContext);
    
    //(B2) To handle keystroke changes to NEW input field of name "todo" and "total"
    const handleChangeNew = (e) => {
        const { name, value } = e.target; 
        setNewTodo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //(B3) To handle adding NEW input into the reducer
    const handleSubmitNew = (e) => {
        e.preventDefault();
        const { todo, total } = newTodo;
        ctx.dispatchTodo({type: ACTIONS.CREATE_TODO, payload: {todo, pomodoro: {total}}}); //To save to reducer
        setNewTodo({todo: "", total: 1});
    }

    //(B4) To disable newTodo form submit button "+"
    const isNewFormButtonDisabled = newTodo.todo.trim() === "";
    return(
        <>
         <form className={`${styles.newForm} ${styles.todo}`} onSubmit={handleSubmitNew}>
                <div>NEW</div>
                <input name="todo" value={newTodo.todo} onChange={handleChangeNew} type="text" placeholder="Add a Task. Enter to save" required/>
                <div className={styles.pomodoroInput}> <input name="total" value={newTodo.total} onChange={handleChangeNew} type="number" min="1" max="20" placeholder="Estimated Pomodoro Time: ? x 30mins" required /> </div>
                <button type="submit" disabled={isNewFormButtonDisabled}> &#43; </button>
            </form>

        </>
    )
}

export default TodoNew;