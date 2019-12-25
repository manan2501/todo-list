import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import { TodoCreator } from "./TodoCreator";
import { TodoRow } from "./TodoRow";
import {VisiblityControl} from "./VisiblityControl";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "Manan",
      todoItems: [
        {action: "Study React", done: false},
        {action: "Study JS - FCC", done: false},
        {action: "Study Udacity- Bertelsmann Tech Scholarship Challenge Course - AI Track Nanodegree Program", done: false},
        {action: "Study Udacity- Intel® Edge AI Scholarship Foundation Course Nanodegree Program", done: false},
        {action: "Draft Alumni Email", done: false}
      ],
      showCompleted: true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({newItemText: event.target.value});
  }

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }]
      });
    }
  }
    

  toggleTodo = (todo) => this.setState({ todoItems:
  this.state.todoItems.map(item => item.action === todo.action
    ? {...item, done: !item.done} : item)});

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map( item =>
    <TodoRow key={ item.action } item={ item } callback={ this.toggleTodo } />)
      

  render = () => 
      <div className="text-center">
        <TodoBanner name = {this.state.userName} tasks = {this.state.todoItems}/>
        <div className="container-fluid">
          <TodoCreator callback={ this.createNewTodo } />
          <table className="table table-striped table-borderd">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                </tr>
            </thead>
            <tbody>{ this.todoTableRows(false) }</tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisiblityControl description="Completed Tasks"
              isChecked={this.state.showCompleted}
              callback={ (checked) =>
                this.setState({ showCompleted: checked })} />
          </div>
          
            { this.state.showCompleted &&
              <table className="table table-striped table-bordered">
                <thead>
                  <tr><th>Description</th><th>Done</th></tr>
                </thead>
                <tbody>{ this.todoTableRows(true) }</tbody>
              </table>
            }
        </div>
      </div>
}

export default App;
