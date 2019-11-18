import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateListName, updateListOwner } from '../../store/actions/actionCreators.js';
import { Modal, Button, Icon } from 'react-materialize';

class ListScreen extends Component {

    handleChange = (id, e) => {
        const { target } = e;
        if(target.id === "name"){
            this.props.updateListName(target.value, id);
        } else if(target.id === "owner"){
            this.props.updateListOwner(target.value, id);
        }
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList)
	        return <React.Fragment />
        return (
            <div className="container grey lighten-3">
                <div className="row">
                <h5 className="grey-text text-darken-3 col s9">Todo List</h5>
                <div>
                <Modal  header="Delete List" trigger={<Button className="waves-effect waves-light btn grey darken-1" large="true">Delete List<Icon large right>delete</Icon></Button>}
                  actions={<div><Button className="grey darken-1 waves-effect waves-light btn modal-action modal-close">Submit</Button>
                  <Button className="grey darken-1 waves-effect waves-light btn modal-action modal-close">Cancel</Button></div>}>
                    <h5>Are you sure that you want to delete this list? This is will no longer be retrievable.</h5>
                    </Modal>
                </div>
                </div>
                <div className = "row">
                <div className="input-field col s6">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={(e) => this.handleChange(todoList.id, e)} value={todoList.name} />
                </div>
                <div className="input-field col s6">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={(e) => this.handleChange(todoList.id, e)} value={todoList.owner} />
                </div>
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
    todoList.id = id;
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

const mapDispatchtoProps = (dispatch) => {
    return{
    updateListName: (todoList, id) => dispatch(updateListName(todoList, id)),
    updateListOwner: (todoList, id) => dispatch(updateListOwner(todoList, id))
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);