import axios from "axios";

export const GET_USERS= "GET_USERS";
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';

export const getUsers=()=>(dispatch)=>{
    return axios.get("http://localhost:2500/users")
    .then(res=>{
        dispatch({
            type:GET_USERS,
            payload:res.data
        })
    })
    .catch(err=>console.log(err))
}

export const createUser = (formData) => (dispatch) => {
    return axios.post("http://localhost:2500/users", formData)
        .then(res => {
            dispatch({
                type: 'CREATE_USER',
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const updateUser = (id, formData) => (dispatch) => {
    return axios.put(`http://localhost:2500/users/${id}`, formData)
        .then(res => {
            dispatch({
                type: 'UPDATE_USER',
                payload: res.data
            });
        })
        .catch(err => console.log(err));
};

export const deleteUser = (userId) => ({
    type: DELETE_USER,
    payload: userId
});

export const getUserById = (userId) => (dispatch) => {
    return axios.get(`http://localhost:2500/users/${userId}`)
        .then((res) => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            });
        })
        .catch((err) => console.error(err));
};
