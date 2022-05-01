import { createContext, useReducer } from "react";
import { v4 as uuid } from 'uuid';


const MOCK_TODOLIST = [
    {
        id: "todo1",
        todo: "✧･ﾟ: *✧･ﾟ:* Welcome *:･ﾟ✧*:･ﾟ✧",
        pomodoro: { current: 1, total: 4, lastTimeSnapshot: 0},
        status: "PENDING", // "PAUSED" / "STARTED" / "PENDING" / "COMPLETED"
        isEditDisabled: true,
    },
    {
        id: "todo2",
        todo: "Double click to start edit existing Todos. Select options to delete.",
        pomodoro: { current: 3, total: 3, lastTimeSnapshot: 0},
        status: "PENDING", // "PAUSED" / "STARTED" / "PENDING" / "COMPLETED" 
        isEditDisabled: true,
    },
    
];

export const ACTIONS = {
    CREATE_TODO: "CREATE_TODO",
    DELETE_TODO: "DELETE_TODO",
    UPDATE_STATUS: "UPDATE_STATUS",
    UPDATE_TODO: "UPDATE_TODO",
    TOGGLE_ISEDITDISABLED: "TOGGLE_ISEDITDISABLED",
    UPDATE_POMODORO: "UPDATE_POMODORO"

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
        case ACTIONS.UPDATE_POMODORO: {
            //IOI user click on pause or 
            const { id, } = payload;
        }
        default: return;
    }
};

export const TodoContext = createContext({
    dispatchTodo: () =>{},
    todoList: [],

});


function TodoContextProvider({children}){
    const [todoList, dispatchTodo ] = useReducer(todoReducer, MOCK_TODOLIST); //For Existing Todos in overallTodoList

    return(
        <TodoContext.Provider value={{
            dispatchTodo,
            todoList
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;