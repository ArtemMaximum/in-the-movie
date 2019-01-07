import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TodoView from './TodoView';

@observer
class TodoList extends Component {
  onNewTodo = () => {
    const { observableTodoStore: store } = this.props;
    store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  };

  render() {
    const { observableTodoStore: store } = this.props;
    return (
      <div>
        {store.report}
        <ul>
          {store.todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        {store.pendingRequests > 0 ? <span>Loading...</span> : null}
        <button onClick={this.onNewTodo}>New Todo</button>
        <small> (double-click a todo to edit)</small>
        Tasks left: {store.pendingRequests}
      </div>
    );
  }
}

export default inject('observableTodoStore')(withRouter(observer(TodoList)));
