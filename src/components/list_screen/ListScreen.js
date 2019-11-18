import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateListName, updateListOwner, deleteList, updateItem } from '../../store/actions/actionCreators.js';
import { Modal, Button, Icon, Card } from 'react-materialize';

class ListScreen extends Component {

  state = {
    reverseTaskSort: true,
    reverseDateSort: true,
    reverseCompletedSort: true,
    }

    sortTasks = (todoList) =>{
      
      if(this.state.reverseTaskSort){
        todoList.items.sort((a,b) => a.description > b.description);
      } else {
        todoList.items.sort((a,b) => a.description < b.description);
      }
      
      if(this.findFirstDate(todoList) === 0){
        this.setState({
          reverseDateSort: true
        })
      } else{
        this.setState({
          reverseDateSort: false
        })
      }
      if(this.findFirstCompleted(todoList) === 0){
        this.setState({
          reverseCompletedSort: true
        })
      } else{
        this.setState({
          reverseCompletedSort: false
        })
      }
      this.readjustKeys(todoList);
      this.setState({
        reverseTaskSort: !this.state.reverseTaskSort
      })
      this.props.updateItem(todoList, todoList.id);
    }
  
    sortDates = (todoList) =>{
      
      if(this.state.reverseDateSort){
        todoList.items.sort((a,b) => a.due_date > b.due_date);
      } else {
        todoList.items.sort((a,b) => a.due_date < b.due_date);
      }
      if(this.findFirstTask(todoList) === 0){
        this.setState({
          reverseTaskSort: true
        })
      } else{
        this.setState({
          reverseTaskSort: false
        })
      }
      if(this.findFirstCompleted(todoList) === 0){
        this.setState({
          reverseCompletedSort: true
        })
      } else{
        this.setState({
          reverseCompletedSort: false
        })
      }
      this.readjustKeys(todoList);
      this.setState({
        reverseDateSort: !this.state.reverseDateSort
      })
      this.props.updateItem(todoList, todoList.id);
    }
  
    sortComplete = (todoList) =>{
      
      if(this.state.reverseCompletedSort){
        todoList.items.sort((a,b) => a.completed > b.completed);
      } else {
        todoList.items.sort((a,b) => a.completed < b.completed);
      }
      if(this.findFirstTask(todoList) === 0){
        this.setState({
          reverseTaskSort: false
        })
      } else{
        this.setState({
          reverseTaskSort: true
        })
      }
      if(this.findFirstDate(todoList) === 0){
        this.setState({
          reverseDateSort: false
        })
      } else{
        this.setState({
          reverseDateSort: true
        })
      }
      this.readjustKeys(todoList);
      this.setState({
        reverseCompletedSort: !this.state.reverseCompletedSort
      })
      this.props.updateItem(todoList, todoList.id);
    }
  
    findFirstTask(todoList){
      for(let i = 0; i < todoList.items.length-1; i++){
        if(todoList.items[i].description <= todoList.items[i+1].description){
          return i;
        } else{
          return i+1;
        }
      }
      return -1;
    }
  
    findFirstDate(todoList){
      for(let i = 0; i < todoList.items.length-1; i++){
        if(todoList.items[i].due_date <= todoList.items[i+1].due_date){
          return i;
        } else{
          return i+1;
        }
      }
      return -1;
    }
  
    findFirstCompleted(todoList){
      for(let i = 0; i < todoList.items.length; i++){
        if(todoList.items[i].completed === true){
          return i;
        }
      }
      return -1;
    }
  
    readjustKeys(todoList){
      let i = 0;
      for(i; i < todoList.items.length; i++){
        todoList.items[i].key = i;
      }
    }

    handleChange = (id, e) => {
        const { target } = e;
        if(target.id === "name"){
            this.props.updateListName(target.value, id);
        } else if(target.id === "owner"){
            this.props.updateListOwner(target.value, id);
        } else if(target.id === "submit"){
            this.props.deleteList(id)
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
                  actions={<div><Link to="/"><Button id="submit" className="grey darken-1 waves-effect waves-light btn modal-action modal-close" onClick={(e) => this.handleChange(todoList.id, e)}>Submit</Button></Link>
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
                <Card className="grey darken-2">
                    <div className="row">
                        <Button className="grey darken-2 btn col s1" large="true" flat="true" style={{marginRight: '175px'}} onClick={(e) => this.sortTasks(todoList)}><h5 style={{color: "white"}}>Task</h5></Button>
                        <Button className="grey darken-2 btn col s5" large="true" flat="true"><h5 style={{color: "white"}} onClick={(e) => this.sortDates(todoList)}>Due Date</h5></Button>
                        <Button className="grey darken-2 btn col s3" large="true" flat="true"><h5 style={{color: "white"}} onClick={(e) => this.sortComplete(todoList)}>Completed</h5></Button>
                    </div>
                </Card>
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
    updateListOwner: (todoList, id) => dispatch(updateListOwner(todoList, id)),
    deleteList: (id) => dispatch(deleteList(id)),
    updateItem: (todoList, id) => dispatch(updateItem(todoList, id))
    }
}

export default compose(
  connect(mapStateToProps, mapDispatchtoProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);