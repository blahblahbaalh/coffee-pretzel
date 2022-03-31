import { createContext, useReducer } from "react";
const { v4: uuid } = require('uuid');

//1.2 
const initialState = {
    userId: null,
    username: null,
    userAvatar: null,
    notification: {
        number: 0,
        messages: []
    },
    cafe: {
        location: null,
        drink: null,
    },
    todo: [
        {
            task1: null,
            taskId: null,
            totalPomodoro: 0,
            remainingPomodoro: 0,
            isCompleted: false,
        }
    ],
};

//1.
const AuthContext = createContext({
    ...initialState,
    setAvatar: () => {},//<-- 5.
    createNewUser: () => {}, 
    completeAPomdoro: () => {},
    setTaskComplete: () => {},
    deleteTask: () => {},
    addNotification: () => {},
    resetNotification: () => {},

});

//4.2 actions list
const ACTIONS = {
    SET_AVATAR: "SET_AVATAR",
    CREATE_NEW_USER: "CREATE_NEW_USER",
    COMPLETE_A_POMODORO: "COMPLETE_A_POMODORO",
    SET_TASK_COMPLETE: "SET_TASK_COMPLETE",
    DELETE_TASK : "DELETE_TASK",
    ADD_NOTIFICATION: "ADD_NOTIFICATION",
    RESET_NOTIFICATION: "RESET_NOTIFICATION"
}



//4. reducer
const reducer = (state, action) => {
    switch (action.type){
        case ACTIONS.SET_AVATAR: {
            const { userAvatar } = action.payload;
            return {
                ...state,
                userId: uuid(),
                userAvatar
            }
        }
        case ACTIONS.CREATE_NEW_USER: {
           const {username, location, drink, todo } = action.payload;
           return {
               ...state,
               username,
               cafe: {location, drink},
               todo: todo.map(each => ({...each, taskId: uuid(), remainingPomodoro: 0, isCompleted: false}))
           }
        }
        case ACTIONS.COMPLETE_A_POMODORO: {
            const {taskId} = action.payload;
            //OBJ: to reduce remaining pomodor by 1, AND if pomodoro remaining is already 1, set to isCompleted to true
            const modifiedTodo = state.todo.map(each => {
                if (each.taskId === taskId){
                    return {
                        ...each,
                        remainingPomodoro: each.remainingPomodoro -1,
                        isCompleted: (each.remainingPomodoro - 1 === 0)
                    }
                }else {
                    return {...each}
                }
            })

            return {
                ...state,
                todo: modifiedTodo
            }
        }
        case ACTIONS.SET_TASK_COMPLETE: {
            const {taskId} = action.payload;
            //OBJ: to reduce remaining pomodor by 1, AND if pomodoro remaining is already 1, set to isCompleted to true
            const modifiedTodo = state.todo.map(each => {
                if (each.taskId === taskId){
                    return {
                        ...each,
                        isCompleted: true
                    }
                }else {
                    return {...each}
                }
            })

            return {
                ...state,
                todo: modifiedTodo
            }
        }
        case ACTIONS.DELETE_TASK: {
            const {taskId} = action.payload;
            const filteredTodo = state.todo.filter(each => each.taskId !== taskId);
            return {
                ...state,
                todo: filteredTodo
            }
        }
        case ACTIONS.ADD_NOTIFICATION: {
            const { message } = action.payload;
            return {
                ...state,
                notification: {
                    number: state.notification.number + 1,
                    messages: [...state.notification.messages, message]
                }
            }
        }
        case ACTIONS.RESET_NOTIFICATION: {
            return {
                ...state,
                notification: {
                    number: 0,
                    message: []
                }
            }
        }
        default: return state;
    }
}

// ======================================================================================//
export function AuthContextProvider({children}){

    //3. 
    const [ stateAuth, dispatchAuth ] = useReducer(reducer, initialState);

    const setAvatar = (userAvatar) => {
        console.log("authcontext", userAvatar);
        dispatchAuth({type: ACTIONS.SET_AVATAR, payload: {userAvatar}});
    }

    //6. Creating UFO fns for createContext
    const createNewUser = ({username, location, drink, todo }) => {
        dispatchAuth({type: ACTIONS.CREATE_NEW_USER, payload: {username, location, drink, todo }});
    }

    const completeAPomdoro = (taskId) => {
        dispatchAuth({type: ACTIONS.COMPLETE_A_POMODORO, payload: {taskId}});
    }

    const setTaskComplete = (taskId) => {
        dispatchAuth({type: ACTIONS.SET_TASK_COMPLETE, payload: {taskId}})
    }

    const deleteTask = (taskId) => {
        dispatchAuth({type: ACTIONS.DELETE_TASK, payload: {taskId}})
    }

    const addNotification = (message) => {
        dispatchAuth({type: ACTIONS.ADD_NOTIFICATION, payload: {message}})
    }

    const resetNotification = () => {
        dispatchAuth({type: ACTIONS.RESET_NOTIFICATION})
    }

    const values = {
        ...stateAuth,
        setAvatar,
        createNewUser,
        completeAPomdoro,
        setTaskComplete,
        deleteTask,
        addNotification,
        resetNotification,
    }


    return(
        // 2.
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;