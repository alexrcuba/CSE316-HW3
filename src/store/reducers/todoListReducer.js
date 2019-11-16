const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO_LIST':
            console.log(action.todoList);
            return state;
        default:
            return state;
    }
};

export default todoListReducer;