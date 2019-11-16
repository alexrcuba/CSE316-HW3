import React from 'react';

class ItemCard extends React.Component {

    ifCompleted(completed){
        if(completed == true){
            return "Completed"
        } else{
            return "Pending"
        }
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card grey z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <div className = "row">
                    <span className="card-title col s3">{item.description}</span>
                    <span className="card-title col s3">{item.assigned_to}</span>
                    <span className="card-title col s3">{item.due_date}</span>
                    <span className="card-title col s3">{this.ifCompleted(item.completed)}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;