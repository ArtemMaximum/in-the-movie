import React, { Component } from 'react';

export default class TodoView extends Component {
  onToggleCompleted = () => {
    const { todo } = this.props;
    todo.completed = !todo.completed;
  };
  onRename = () => {
    const { todo } = this.props;
    // console.log('\n ... todo ...', todo);
    todo.task = prompt('Task name', todo.task) || '';
  };
  render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this.onRename}>
        <input type="checkbox" checked={todo.completed} onChange={this.onToggleCompleted} />
        {todo.task}
        {todo.assignee ? <small>{todo.assignee.name}</small> : null}
      </li>
    );
  }
}
