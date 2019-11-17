import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        //console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                    <Link to={'/todoList/' + todoList.id + "/" + item.key} key={todoList.key}>
                        <ItemCard todoList={todoList} item={item} />
                    </Link>
                    );})
                }
                <Link to={'/todoList/' + todoList.id + "/" + items.length} key={todoList.key}>
                    <div className="card-content grey-text text-darken-3">
                        <div className="card grey z-depth-0 todo-list-link pink-lighten-3">+</div>
                    </div>
                </Link>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);