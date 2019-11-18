import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {DatePicker} from 'react-materialize';
import { updateItem } from '../../store/actions/actionCreators.js';

class ItemScreen extends Component {
    state = {
        init : false,
        item: {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
        key: -1
        }
    }

    handleChange = (list, item, e) => {
        //console.log("BEFORE: ");
        //console.log(item)
        if(this.state.init === false){
            this.setState({
                init: true,
                item: {
                description: item.description,
                assigned_to: item.assigned_to,
                due_date: item.due_date,
                completed: item.completed,
                key: item.key
                }
            });
        }
        if(e instanceof Date){
            item.due_date = e.toISOString().split('T')[0]
            list.items[item.key] = item
        } else {
        const { target } = e
        if(target.id === "description"){
            item.description = target.value
            list.items[item.key] = item
        } else if(target.id === "assigned_to"){
            item.assigned_to = target.value
            list.items[item.key] = item
        } else if(target.id === "completed"){
            item.completed = !(item.completed)
            list.items[item.key] = item
        } else if(target.id === "cancel"){
            if(this.state.init !== false){
                list.items[item.key] = this.state.item;
            } else if(item.key === list.items.length){
                list.items = list.items.slice(0, list.items.length);
            }
        }
    }
    //console.log("AFTER: ");
    //console.log(item)
    this.submitDisable(item);
    this.props.updateItem(list, list.id)
    }

    submitDisable(item) {
        if(item.assigned_to === "" || item.description === "" || item.due_date === ""){
            return "waves-effect waves-light btn-large disabled grey darken-1";
        } else {
            return "waves-effect waves-light btn-large grey darken-1";
        }
    }

    checkifDisabled(item, e){
        if(item.assigned_to === "" || item.description === "" || item.due_date === ""){
            e.preventDefault();
        }
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
                <h5 className="grey-text text-darken-3">Edit Todo List Item</h5>
                <div className = "row">
                <div className="input-field">
                    <label htmlFor="email">Description</label>
                    <input className="active" type="text" name="name" id="description" onChange={(e) => this.handleChange(todoList, item, e)} value={item.description} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Assigned To</label>
                    <input className="active" type="text" name="owner" id="assigned_to" onChange={(e) => this.handleChange(todoList, item, e)} value={item.assigned_to} />
                </div>
                <div className="datepicker col s8">
                    <label htmlFor="due_date">Due Date</label>
                    <DatePicker value = {item.due_date} onChange={(e) => this.handleChange(todoList, item, e)}/>
                </div>
                <div className="checkbox">
                    <p>
                        <label>
                            <input id="completed" type="checkbox" className="filled-in  grey darken-1" checked={item.completed} onChange={(e) => this.handleChange(todoList, item, e)} />
                            <span>Completed</span>
                        </label>
                    </p>
                </div>
                <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={(e) => this.checkifDisabled(item, e)}>
                <div class={this.submitDisable(item)}>Submit</div>
                </Link>
                <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                <div id="cancel" class="waves-effect waves-light btn-large grey darken-1" onClick={(e) => this.handleChange(todoList, item, e)}>Cancel</div>
                </Link>
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return{
    updateItem: (list, id) => dispatch(updateItem(list, id)),
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  var { key } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  var item = null;
  if(todoList){
    todoList.id = id;
    if(key=== todoList.items.length.toString() ){
        item = {
            description: '',
            assigned_to: '',
            due_date: '',
            completed: false,
            key: todoList.items.length
        }
    } else{
    item = todoList.items[key];
    }
  }
  return {
    todoList,
    item,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);