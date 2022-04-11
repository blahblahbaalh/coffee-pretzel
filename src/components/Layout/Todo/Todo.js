
import { useReducer, useState } from "react";
import { v4 as uuid } from 'uuid';

import styles from "./todo.module.css";

const MOCK_TODOLIST = [
    {
        id: "todo1",
        todo: "✧･ﾟ: *✧･ﾟ:* Welcome *:･ﾟ✧*:･ﾟ✧",
        pomodoro: { current: 1, total: 4, lastTimeSnapshot: ""},
        status: "PENDING", // "PAUSED" / "STARTED" / "PENDING" / "COMPLETED"
        isEditDisabled: true,
    },
    {
        id: "todo2",
        todo: "Double click to start edit existing Todos. Select options to delete.",
        pomodoro: { current: 3, total: 3, lastTimeSnapshot: ""},
        status: "PENDING", // "PAUSED" / "STARTED" / "PENDING" / "COMPLETED" 
        isEditDisabled: true,
    },
    
];

const ACTIONS = {
    CREATE_TODO: "CREATE_TODO",
    DELETE_TODO: "DELETE_TODO",
    UPDATE_STATUS: "UPDATE_STATUS",
    UPDATE_TODO: "UPDATE_TODO",
    TOGGLE_ISEDITDISABLED: "TOGGLE_ISEDITDISABLED",

}

const todoReducer = (state, action) => {
    const { type, payload } = action;
    console.log('action', action);
    switch(type) {
        case ACTIONS.CREATE_TODO: {
            const { todo, pomodoro: {total}} = payload;
            return [
                ...state,
                {
                    id: uuid(),
                    todo,
                    pomodoro: {
                        current: 0,
                        total: total,
                        lastTimeSnapshot: 0,
                    },
                    status: "PENDING",
                    isEditDisabled: true
                }
            ]
        }
        case ACTIONS.DELETE_TODO: {
            const { id } = payload;
            return state.filter(each => each.id !== id);
        }
        case ACTIONS.UPDATE_STATUS: {
            const { status, id } = payload;
            return state.map(each => {
                if (each.id === id){
                    return {
                        ...each,
                        status,
                    }
                }else {
                    return each
                }
            })
        }
        case ACTIONS.UPDATE_TODO: {
            const { todo = null, total = null, id } = payload;
            console.log("todo", todo, "total", total, "id", id);
            return state.map(each => {
                if (each.id === id){
                    return {
                        ...each,
                        todo: (todo.trim() === "" ? each.todo : todo),
                        pomodoro: {
                            ...each.pomodoro,
                            total: total || each.pomodoro.total,
                        },
                        isEditDisabled: true
                    }
                } else {
                    return each
                }
            });
        }
        case ACTIONS.TOGGLE_ISEDITDISABLED: {
            const {id} = payload;
            return state.map(each => {
                if (each.id === id){
                    return {
                        ...each,
                        isEditDisabled: false
                    }
                } else {
                    return {
                        ...each,
                        isEditDisabled: true
                    }
                }
            });
        }
        default: return;
    }
};


function Todo(){
    // =========================================== STATES ============================================//
    //(A) STATES:
    const [todoList, dispatchTodo ] = useReducer(todoReducer, MOCK_TODOLIST); //For Existing Todos in overallTodoList
    const [newTodo, setNewTodo ] = useState({ //For new todo keystroke
        todo: "",
        total: 1
    });
    const [editTodo, setEditTodo ] = useState({ //For existing todo keystroke
        todo: null,
        total: null
    })

    // ======================================= FORM: NEW TODO ================================================//
    //(B1) To handle keystroke changes to NEW input field of name "todo" and "total"
    const handleChangeNew = (e) => {
        const { name, value } = e.target; 
        setNewTodo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //(B2) To handle adding NEW input into the reducer
    const handleSubmitNew = (e) => {
        e.preventDefault();
        const { todo, total } = newTodo;
        dispatchTodo({type: ACTIONS.CREATE_TODO, payload: {todo, pomodoro: {total}}}); //To save to reducer
        setNewTodo({todo: "", total: 1});
    }

    //(B3) To disable newTodo form submit button "+"
    const isNewFormButtonDisabled = newTodo.todo.trim() === "";

    // ======================================== FORM: EXISTING TODOSLIST =================================================//
    //(C1) To handle status change from dropdown select-option 
    // name: "UPDATE_STATUS"
    // value:"PAUSED" / "STARTED" / "PENDING" / "COMPLETED" / "DELETE_TODO"
    const handleStatusEdit = (e, id) => {
        const { name, value } = e.target;
        if (value === "DELETE_TODO") {
            return dispatchTodo({type: ACTIONS[value], payload: {id}})
        }
        dispatchTodo({type: ACTIONS[name], payload: {status: value, id}});
    }

    //(C2) To handle 
    //1- toggling the existing todo's disabled
    //2- set the todos into a temporary state: newTodo (st if user enter empty, we can retrieve the original field)
    const handleToggleEdit = (id) => {
        //(1)
        dispatchTodo({type: ACTIONS.TOGGLE_ISEDITDISABLED, payload: {id}});
        //(2)
        const foundTodo = todoList.find(each => each.id === id);
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
        editTodo.id && dispatchTodo({type: ACTIONS.UPDATE_TODO, payload: { todo, total, id}});
        //resetting
        setEditTodo({
            todo: null,
            total: null
        })
    }

    return(
        <>
        <div className={styles.todos}>
            {/* ================ HEADER ================ */}
            <div className={styles.todo}>
                <div>NO.</div>
                <div>TODO</div>
                <div>SETS</div>
                <div>ACTION</div>
            </div>

             {/* ================ NEW INPUT FORM ================ */}
            <form className={`${styles.newForm} ${styles.todo}`} onSubmit={handleSubmitNew}>
                <div>NEW</div>
                <textarea name="todo" value={newTodo.todo} onChange={handleChangeNew} type="text" placeholder="Add a Task. Enter to save" required/>
                <div className={styles.pomodoroInput}> <input name="total" value={newTodo.total} onChange={handleChangeNew} type="number" min="1" max="20" placeholder="Estimated Pomodoro Time: ? x 30mins" required /> </div>
                <button type="submit" disabled={isNewFormButtonDisabled}> &#43; </button>
            </form>

            {/* ========== EDITING EXISTING INPUT FORM ========== */}
        {
            todoList.map((each, index) => (
                <form className={styles.todo} onSubmit={handleSubmitEditing} onBlur={handleSubmitEditing} onDoubleClick={() => handleToggleEdit(each.id)}  key={each.id}>
                    <div>{index+1}</div>
                    <textarea 
                        type="text" 
                        className={styles.todoName} 
                        // readOnly={each.isEditDisabled}
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
                            // readOnly={each.isEditDisabled}
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
                </form>
            ))
        }
        </div>
        </>
    )
}

export default Todo;