import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.scss'

import Search from './components/Search'
import TodoList from './components/TodoList'
import AddButton from './components/AddButton'

const USER_KEY = 'user'

function App() {
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [todoText, setTodoText] = useState('')

    const fetchTodoList = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api/todos/${user.user_id}`)
            const data = await res.json()
            setTodoList(data)
            setIsLoading(false)
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    const initUser = () => {
        const user = JSON.parse(localStorage.getItem(USER_KEY))
        if (!user) {
            const userToAdd = {
                user_id: uuidv4()
            }

            localStorage.setItem(USER_KEY, JSON.stringify(userToAdd))
        } else {
            setUser(user)
        }
    }

    const addTodo = async () => {
        try {
            await fetch(`/api/todos`, {
                method: 'POST',
                body: JSON.stringify({
                    text: todoText,
                    user_id: user.user_id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setTodoText('')
            fetchTodoList()
        } catch (err) {
            console.error(err)
        }
    }

    const removeTodo = async (id) => {
        try {
            await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            })
            fetchTodoList()
        } catch (err) {
            console.error(err)
        }
    }

    const handleTodoTextChange = (text) => {
        setTodoText(text)
    }

    useEffect(() => {
        initUser()
    }, [])

    useEffect(() => {
        if (user.user_id) {
            fetchTodoList()
        }
    }, [user])

    return (
        <div className="container">
            <div className="search-container">
                <Search
                    onChange={handleTodoTextChange}
                    placeholder="type todo"
                    value={todoText}
                />

                <AddButton
                    onAdd={addTodo}
                    disabled={!todoText}
                />
            </div>

            <TodoList
                todoList={todoList}
                onDelete={removeTodo}
            />
        </div>
    );
}

export default App
