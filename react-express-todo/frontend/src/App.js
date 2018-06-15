// Matthew Binshtok
/* To-Do List React App

This is the React front-end of an application with Express routing
as its backend.

Users can add tasks to a to-do list through a text input.
Users can remove tasks from the to-do list using a remove button.
Users can click a checkbox next to a task to mark it as completed.
Users can remove completed tasks from the to-do list, and add them to a
completed tasks list by pressing a complete tasks button.

*/

import React, { Component } from 'react';
import './App.css';

class App extends Component {

     // called when component instance is mounted onto the Native UI
     // on startup, fetches the list of tasks stored on the server
     componentDidMount() {
          fetch('/tasks')
          .then(res => res.json())
          .then(tasks => this.setState({ arrayOfTasks: tasks }));
     }

     // name: name of task currently being written
     // arrayOfTasks: tasks currently in the to-do list
     constructor(){
          super();
          this.state = {
               name: "",
               arrayOfTasks: []
          }
     }

     // handles a change in the task name text input field
     // changes app state to reflect text currently in box
     handleChange(event){
          const name = event.target.value;
          this.setState({
               name
          })
          //console.log("this is the name in the handleChange: ", this.state.name )
     }

     // handles a submit of the task name text field
     // pushes task object to backend for saving
     // changes app state to empty the text box and pushes new task to list
     handleSubmit(event){
          // prevent default
          event.preventDefault();
          // initialize state data members
          let name = this.state.name;
          let temp = this.state.arrayOfTasks;
          if (temp.length > 0){
               var nextAvailableId = this.state.arrayOfTasks[this.state.arrayOfTasks.length-1].taskId + 1;
          } else {
               var nextAvailableId = 0;
          }
          // make sure not to add empty tasks
          if (name !== ""){
               // initialize task
               let task = {
                    name: name,
                    isStarred: false,
                    isCompleted: false,
                    taskId: nextAvailableId
               };
               // push task to list
               temp.push(task);
               // push task to express server
               fetch('tasks/addtask', {
                    method: 'POST',
                    headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
               })
               // empty name
               name = "";
               // update app state
               this.setState({
                    name: name,
                    arrayOfTasks: temp
               })
               // empty the text input field
               let text = this.refs.text;
               text.value = "";
          }
     }

     // removes a given task from the to-do list
     // pushes index of task to be removed to backend for removal from json file
     // changes app state to remove task from array of tasks
     removeTask(index, event){
          // intiailze state data member
          let temp = this.state.arrayOfTasks;
          // remove the task from the list
          temp.splice(index,1);
          // make object for the removal request
          let remove = {index: index};
          // push removal request
          fetch('tasks/removetask', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(remove)
          })
          // update app state
          this.setState({
               arrayOfTasks: temp,
          })
     }

     // moves a completed task to the completed tasks list
     // changes app state to mark task object as completed
     completeTask(index){
          // intiailze state data member
          let temp = this.state.arrayOfTasks;
          // mark task as completed
          temp[index].isCompleted = true;
          // make object for completion request
          let complete = {index: index};
          // push completion request
          fetch('tasks/completetask', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(complete)
          })
          // update app state
          this.setState({
               arrayOfTasks: temp
          })
     }

     // stars the task at given index
     // see stylesheet for difference in formatting: starred-task-wrapper
     starTask(index, event){
          // intiailze state data member
          let temp = this.state.arrayOfTasks;
          // toggle task importance
          temp[index].isStarred = !temp[index].isStarred;
          // make object for toggle request
          let toggle = {index: index};
          // push star request
          fetch('tasks/startask', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(toggle)
          })
          // update app state
          this.setState({
               arrayOfTasks: temp
          })
     }

     // filters array to return uncompleted tasks
     deleteCompletedTasks(array){
          return array.filter(item => !item.isCompleted);
     }

     // filters array to return completed tasks
     deleteUncompletedTasks(array){
          return array.filter(item => item.isCompleted);
     }

     render() {
          // tasks in to-do list
          const arrayOfTasks = this.state.arrayOfTasks;

          // filter for uncompleted tasks
          const uncompletedTasks = this.deleteCompletedTasks(arrayOfTasks);

          // construct each task object
          let task = uncompletedTasks.map((task) => (
               <li key={task.taskId} >
                    <div className="button-wrapper">
                         <button id="checked-button"
                              onClick={ this.completeTask.bind(this,task.taskId) }>
                              &#10003;
                         </button>
                         <button id="star-task-button" onClick={this.starTask.bind(this,task.taskId)}> &#9733; </button>
                    </div>
                    <div className={ (task && task.isStarred) ? "starred-task-wrapper" : "task-wrapper"}>
                         {(task && !task.isCompleted) ? task.name : null}
                    </div>
                    <div className="remove-wrapper">
                         <button id="remove-task-button" onClick={this.removeTask.bind(this,task.taskId)}> &#9747; </button>
                    </div>
               </li>
          ));

          // filter for completed tasks
          const completedTasks = this.deleteUncompletedTasks(arrayOfTasks);

          // construct completed task objects
          let finish = completedTasks.map((finish) => (
               <li key={finish.taskId} > {(finish) ? finish.name : null} </li>
          ));

          return (
               <div className="App">
                    <div className="App-header">
                         <p className="App-name"> To-Do-List </p>
                         <p className="App-credits"> a React app by Matthew Binshtok </p>
                    </div>
                    <div className="content-wrapper">
                         <div className="main-content">
                              <div className="task-input">
                                   <form onSubmit={this.handleSubmit.bind(this)}>
                                        <p className="App-intro">
                                             Add a Task
                                        </p>
                                        <input className="add-task-field" ref="text" onChange={this.handleChange.bind(this)} type="text" name="task" />
                                        <input className="add-task-button" type="submit" value="Add Task" />
                                        <br />
                                   </form>
                              </div>
                              <div className="to-do-list">
                                   <p className="App-intro">
                                        To-Do List
                                   </p>
                                   <ul id="to-do">
                                        { (task) ? task : null }
                                   </ul>
                              </div>
                              <div className="completed-tasks-list">
                                   <p className="completed-label">
                                        Completed Tasks
                                   </p>
                                   <ul id="completed">
                                        { (finish) ? finish : null }
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

}

export default App;
