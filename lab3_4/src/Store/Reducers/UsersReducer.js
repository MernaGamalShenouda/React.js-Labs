import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER_BY_ID } from "../Actions/UsersAction.js";

const INITIAL_STATE = {
    list:[],
    selectedUser: null 
}

export default function usersReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                list:action.payload
            };

        case GET_USER_BY_ID:
            return {
                ...state,
                selectedUser: action.payload
            };

        case CREATE_USER:
            return {
                ...state,
                list: [...state.list, action.payload]
            };

        case UPDATE_USER:
            const updatedUsers = state.list.map(user => {
                if (user.id === action.payload.id) {
                    return action.payload;
                }
                return user;
            });
            return {
                ...state,
                list: updatedUsers
            };

        case DELETE_USER:
            return {
                ...state,
                list: state.list.filter(user => user.id !== action.payload)
            };
            
        default:
            return state
    }
}