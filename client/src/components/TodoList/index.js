import React from 'react'

import RemoveButton from '../RemoveButton'
import './index.scss'

const TodoItem = ({todo = {}, onDelete, ...props}) => {
    return (
        <div key={todo._id} {...props} className="todo-item">
            <span>{todo.text}</span>
            <RemoveButton onClick={() => onDelete(todo._id)}/>
        </div>
    )
}

const TodoList = ({
                      todoList = [],
                      onDelete
                  }) => {
    return (
        <div className="todo-list">
            {
                todoList.map(todo => {
                    return (
                        <TodoItem
                            todo={todo}
                            onDelete={onDelete}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList