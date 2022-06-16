import React from 'react'

import RemoveButton from '../RemoveButton'

const TodoList = ({
    todoList = [],
    onDelete
}) => {
    return (
        <>
            {
                todoList.map(todo => {
                    return (
                        <div key={todo._id}>
                            <span>{todo.text}</span>
                            <RemoveButton onClick={() => onDelete(todo._id)} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default TodoList