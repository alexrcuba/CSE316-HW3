import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import TodoListLinks from './TodoListLinks'
import { Link } from 'react-router-dom';
import history from './history';

class HomeScreen extends Component {
    
    handleNewList = () => {
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
                    name: "NULL",
                    owner: "NULL",
                    items: [],
                    created: firebase.firestore.Timestamp.fromDate(new Date())
                }).then((todoList) => {
                    history.push({pathname: '/todolist/' + todoList.id});
                }).catch((err) => {
                    console.log(err);
            });
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['created', 'desc'] },
    ]),
)(HomeScreen);