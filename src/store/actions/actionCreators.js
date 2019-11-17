import history from '../../components/home_screen/history';
// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CREATE_TODO_LIST = 'CREATE_TODO_LIST';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection("todoLists").add({
        ...todoList
    }).then((todoList) => {
        history.push({pathname: '/todolist/' + todoList.id});
        dispatch({type: 'CREATE_TODO_LIST', todoList})
    }).catch((err) => {
        dispatch({
            type: 'CREATE_TODO_LIST_ERROR', err})
    })
    }
}
export function updateListName(name, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("todoLists").doc(id).update({
            name: name
        }).then(() => {
            dispatch({type: 'UPDATE_LIST_NAME', name})
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_LIST_NAME_ERROR', err})
        })
        }
}
export function updateListOwner(owner, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("todoLists").doc(id).update({
            owner: owner
        }).then(() => {
            dispatch({type: 'UPDATE_LIST_NAME', owner})
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_LIST_NAME_ERROR', err})
        })
        }
}
export function updateNewDate(id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        const firebase = getFirebase();
        firestore.collection("todoLists").doc(id).update({
            created: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(() => {
            dispatch({type: 'UPDATE_NEW_DATE', id})
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_NEW_DATE_ERROR', err})
        })
        }
}
export function updateItem(list, id) {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        firestore.collection("todoLists").doc(id).update({
            items: list.items
        }).then(() => {
            dispatch({type: 'UPDATE_ITEM', id})
        }).catch((err) => {
            dispatch({
                type: 'UPDATE_ITEM', err})
        })
        }
}
