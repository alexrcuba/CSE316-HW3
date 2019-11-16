import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from 'firebase/app';
import TodoListLinks from './TodoListLinks'
import { Link } from 'react-router-dom';
import {createTodoList} from '../../store/actions/actionCreators'

class HomeScreen extends Component {

    state = {
        name: "NULL",
        owner: "NULL",
        items: [],
        created: firebase.firestore.Timestamp.fromDate(new Date())
    }
    
    handleNewList = (e) => {
        e.preventDefault()
        this.props.createTodoList(this.state)
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                            <Link to = {this.history}>
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return{
        createTodoList: (todoList) => dispatch(createTodoList(todoList))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['created', 'desc'] },
    ]),
)(HomeScreen);