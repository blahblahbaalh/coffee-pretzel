import { createContext, useReducer } from "react";
const { v4: uuid } = require('uuid');

//1.
// const initialState = {
//     userId: null,
//     username: null, //MrBlah
//     userAvatar: null,
//     cafe: {
//         location: null, //eg "-JhoMGoAFc"
//         drink: null, //eg hotMocha
//     },
// };
const initialState = {
    userId: "u01",
    username: "Mr Blah",
    userAvatar: "peep1",
    cafe: {
        location: "r1N4CmHq0RA",
        drink: "hotLatte",
    },
};

//2. actions list
export const USER_ACTIONS = {
    SET_AVATAR: "SET_AVATAR",
    CREATE_USER: "CREATE_USER",
}

//3. reducer
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type){
        case USER_ACTIONS.SET_AVATAR: {
            const { userAvatar } = payload;
            return {
                ...state,
                userId: uuid(),
                userAvatar
            }
        }
        case USER_ACTIONS.CREATE_USER: {
            const {location, drink, username} = payload;
            return {
                ...state,
                username,
                cafe: {
                    location,
                    drink
                }
            }
        }

        default: return state;
    }
}


//2.
export const UserContext = createContext({
    user: {},
    dispatchUser: () => {}
});

// ======================================================================================//
function UserContextProvider({children}){
    const [ user, dispatchUser ] = useReducer(reducer, initialState);

    const values = {
        user,
        dispatchUser
    }


    return(
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;