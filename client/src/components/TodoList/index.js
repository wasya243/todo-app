import React from 'react'

import RemoveButton from '../RemoveButton'
import './index.scoped.scss'

const TodoItem = ({todo = {}, onDelete, onComplete, ...props}) => {
    return (
        <div
            key={todo._id}
            className={`todo-item ${todo.is_completed ? 'completed' : ''}`}
            onClick={() => onComplete(todo._id, !todo.is_completed)}
            {...props}
        >
            <span>{todo.text}</span>
            <RemoveButton onClick={() => onDelete(todo._id)}/>
        </div>
    )
}

const TodoList = ({
                      todoList = [],
                      onDelete,
                      onComplete
                  }) => {
    return (
        <div className="todo-list">
            {
                todoList.map(todo => {
                    return (
                        <TodoItem
                            todo={todo}
                            onDelete={onDelete}
                            onComplete={onComplete}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList