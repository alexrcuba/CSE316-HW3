import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { updateNewDate } from '../../store/actions/actionCreators.js';

class TodoListLinks extends React.Component {

    handleNewDate = (id, e) => {
        this.props.updateNewDate(id);
    }

    render() {
        const todoLists = this.props.todoLists;
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={(e) => this.handleNewDate(todoList.id, e)} >
                        <TodoListCard todoList={todoList}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return{
        updateNewDate: (id) => dispatch(updateNewDate(id))
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps, mapDispatchtoProps))(TodoListLinks);