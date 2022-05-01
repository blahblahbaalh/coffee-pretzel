
import {  useContext, useState } from "react";
import TodoNew from "./TodoNew";

import styles from "./todo.module.css";
import { TodoContext, ACTIONS } from "../../../store/todo-context";




function Todo({className, onClick, isCollapsed, isTable}){
    //(A) STATES:
    const [editTodo, setEditTodo ] = useState({ //For existing todo keystroke
        todo: null,
        total: null
    });
    const ctx = useContext(TodoContext);

    // ======================================== FORM: EXISTING TODOSLIST =================================================//
    //(C1) To handle status change from dropdown select-option 
    // name: "UPDATE_STATUS"
    // value:"PAUSED" / "STARTED" / "PENDING" / "COMPLETED" / "DELETE_TODO"
    const handleStatusEdit = (e, id) => {
        const { name, value } = e.target;
        if (value === "DELETE_TODO") {
            return ctx.dispatchTodo({type: ACTIONS[value], payload: {id}})
        }
        ctx.dispatchTodo({type: ACTIONS[name], payload: {status: value, id}});
    }

    //(C2) To handle 
    //1- toggling the existing todo's disabled
    //2- set the todos into a temporary state: newTodo (st if user enter empty, we can retrieve the original field)
    const handleToggleEdit = (id) => {
        //(1)
        ctx.dispatchTodo({type: ACTIONS.TOGGLE_ISEDITDISABLED, payload: {id}});
        //(2)
        const foundTodo = ctx.todoList.find(each => each.id === id);
        setEditTodo({todo: foundTodo.todo, total: foundTodo.total, id: id});
    }


    //(C3) To handle input keystroke change - todo and/or total pomodoros
    const handleChangeEdit = (e) => {
        const { name, value} = e.target;
        setEditTodo((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
    }

    //(C4) To handle submitting the final changes to useReducer
    const handleSubmitEditing = (e) => {
        e.preventDefault();
        const { todo, total, id } = editTodo;
        editTodo.id && ctx.dispatchTodo({type: ACTIONS.UPDATE_TODO, payload: { todo, total, id}});
        //resetting
        setEditTodo({
            todo: null,
            total: null
        })
    }

    //To det what to map. if its collapse view, only 1 row of Todo in view. if its full view, map thr entire list.
    const todoListToBeMapped = isCollapsed ? [ctx.todoList[0]] : ctx.todoList;
    console.log("todoListToBeMapped", [ctx.todoList[0]]);

    return(
        <>
        <div className={`${styles.todos} ${className}`}>
            {/* ================ HEADER ================ */}
            <div className={styles.todo} onClick={onClick}>
                <div>NO.</div>
                <div>TODO</div>
                <div>SETS</div>
                <div>ACTION</div>
            </div>

            {/* ========== NEW INPUT FORM ========== */}
           {!isTable && <TodoNew />}
            {/* ========== EDITING EXISTING INPUT FORM ========== */}
        {
            todoListToBeMapped.map((each, index) => (
                <form onSubmit={handleSubmitEditing} onBlur={handleSubmitEditing} onDoubleClick={() => handleToggleEdit(each.id)}  key={each.id}>
                    <div className={`${styles.todo} ${!each.isEditDisabled && styles.editEnabled}`} >
                    <div>{index+1}</div>
                    <input 
                        type="text" 
                        readOnly={each.isEditDisabled}
                        onChange={handleChangeEdit}
                        name="todo"
                        value={(editTodo.id === each.id) ? editTodo.todo : each.todo}
                        />
                    <div className={styles.pomodoroInput}>
                        <sup>{each.pomodoro.current}</sup>  / 
                        <sub>
                        <input 
                            type="number" 
                            min={each.pomodoro.current} 
                            max="20" 
                            readOnly={each.isEditDisabled}
                            onChange={handleChangeEdit}
                            name="total"
                            value={(editTodo.id === each.id) ? editTodo.total : each.pomodoro.total}
                            />
                        </sub>
                    </div>
                    <select name="UPDATE_STATUS" onChange={(e) => handleStatusEdit(e, each.id)}>
                            {
                                (each.pomodoro.current < each.pomodoro.total) &&
                                <>
                                <option value="PENDING">&#10061;</option>
                                <option value="STARTED">&#9832;</option>
                                <option value="PAUSED">&#10074;</option>
                                </>
                            }
                            <option value="COMPLETED">&#10004;</option>
                            <option value="DELETE_TODO">&#10007;</option>
                    </select>
                    <button className="hidden" type="submit">SUBMIT</button>
                    </div>
                </form>
            ))
        }
        {/* ========== NEW INPUT FORM: shifted to bottom if isTable page + is not collapsed ========== */}
        {isTable && !isCollapsed && <TodoNew />}
        </div>
        </>
    )
}

export default Todo;