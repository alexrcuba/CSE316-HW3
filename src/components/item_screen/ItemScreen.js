import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {DatePicker} from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component {
    state = {
        name: '',
        owner: '',
    }
  
    handleDateChange (date) {
        const fireStore = getFirestore();
        let timeRef = fireStore.collection('todoLists').doc();
        console.log(timeRef);
        //timeRef.update({created: firebase.firestore.Timestamp.fromDate(new Date())})
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const item = this.props.item;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
	        return <React.Fragment />
        if(!item)
	        return <React.Fragment />
        return (
            <div className="container grey lighten-3">
                <h5 className="grey-text text-darken-3">Edit Todo List</h5>
                <div className = "row">
                <div className="input-field">
                    <label htmlFor="email">Description</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={item.description} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Assigned To</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={item.assigned_to} />
                </div>
                <div className="datepicker">
                    <label htmlFor="due_date">Due Date</label>
                    <DatePicker value = {item.due_date} onChange={this.handleDateChange}/>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { key } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  var item = null;
  if(todoList){
    todoList.id = id;
    item = todoList.items[key];
  }
  /*
  const fireStore = getFirestore();
  let timeRef = fireStore.collection('todoLists').doc(id);
  timeRef.update({created: firebase.firestore.Timestamp.fromDate(new Date())});*/
    

  return {
    todoList,
    item,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);