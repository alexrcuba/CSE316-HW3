import React from 'react';
import {Button, Icon} from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateItem } from '../../store/actions/actionCreators.js';

class ItemCard extends React.Component {

    ifCompleted(completed){
        if(completed === true){
            return "Completed"
        } else{
            return "Pending"
        }
    }

    upDisable(item) {
        if(item.key === 0){
            return "grey lighten-1 disabled";
        } else {
            return "grey lighten-1";
        }
    }

    downDisable(item, todoList) {
        if(item.key === ((todoList.items.length)-1)){
            return "grey darken-2 disabled";
        } else {
            return "grey darken-2";
        }
    }

    moveItemUp = (updateList, index) => {
        if(index > 0){
            let temp = updateList.items[index-1];
            updateList.items[index-1] = updateList.items[index];
            updateList.items[index-1].key -= 1;
            updateList.items[index] = temp;
            updateList.items[index].key +=1;
        }
        this.props.updateItem(updateList, updateList.id)
    }

    moveItemDown = (updateList, index) => {
        if(index < updateList.items.length-1){
          let temp = updateList.items[index+1];
          updateList.items[index+1] = updateList.items[index];
          updateList.items[index+1].key += 1;
          updateList.items[index] = temp;
          updateList.items[index].key -=1;
          }
        this.props.updateItem(updateList, updateList.id)
    }

    removeItem  = (updateList, index) => {
        updateList.items.splice(index, 1);
        let i = 0;
        for(i; i < updateList.items.length; i++){
            updateList.items[i].key = i;
        }
        this.props.updateItem(updateList, updateList.id)
    }

    render() {
        const { item } = this.props;  
        const todoList = this.props.todoList;
        return (
            <div className="card grey z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <div className = "row">
                    <span className="card-title col s3">{item.description}</span>
                    <span className="card-title col s2">{item.assigned_to}</span>
                    <span className="card-title col s4">{item.due_date}</span>
                    <span className="card-title col s2">{this.ifCompleted(item.completed)}</span>
                    <div className="fixed-action-btn">
                    <Button fab={{direction:"left"}} floating large className="grey darken-1" onClick={(e) => e.preventDefault()}>
                        <Button floating small className={this.upDisable(item)} waves="light" onClick={(e) => this.moveItemUp(todoList, item.key)}><Icon>arrow_upward</Icon></Button>
                        <Button floating small className={this.downDisable(item, todoList)} waves="light" onClick={(e) => this.moveItemDown(todoList, item.key)}><Icon>arrow_downward</Icon></Button>
                        <Button floating small className="black" waves="light" onClick={(e) => this.removeItem(todoList, item.key)}><Icon>delete</Icon></Button>
                    </Button>
                    </div>
                    </div>
                </div>
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

const mapDispatchtoProps = (dispatch) => {
    return{
    updateItem: (todoList, id) => dispatch(updateItem(todoList, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemCard);