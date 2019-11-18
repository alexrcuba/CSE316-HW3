import React from 'react';
import {Button, Icon} from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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
                        <Button floating small className={this.upDisable(item)} waves="light"><Icon>arrow_upward</Icon></Button>
                        <Button floating small className={this.downDisable(item, todoList)} waves="light"><Icon>arrow_downward</Icon></Button>
                        <Button floating small className="black" waves="light"><Icon>delete</Icon></Button>
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

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemCard);