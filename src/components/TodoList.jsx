import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// assets
import AddTaskIcon from '../icons/AddTaskIcon'

// components
import Todo from './Todo'

// utils
import { fetchTodo, createTodo, deleteTodo, toggleTodo } from '../utils/todoUtils'

function TodoList() {
  const [ todo, setTodo ] = useState([])
  const [ input, setInput ] = useState('')

  useEffect(() => {
    const unsubscribe = fetchTodo(setTodo)
    return () => unsubscribe()
  }, [])

  const handleCreateTodo = async (event) => {
    event.preventDefault()

    if (!input) {
      const notify = toast.error("Please enter a value", {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
      return notify
    }

    setInput('')
    await createTodo(input)
  }

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id)
  }

  const handleToggleTodo = async (todo) => {
    await toggleTodo(todo)
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-slate-300 px-10 py-20">
        <div className="p-4 rounded-lg">
          <h1 className="text-2xl text-center font-bold mb-4 text-slate-900">
            Todo List
          </h1>
          <form
            className="flex justify-between items-center gap-2 mb-4"
            onSubmit={ handleCreateTodo }
          >
            <input
              className="rounded-full px-4 bg-slate-100 focus:outline-none border-2 shadow border-slate-100 duration-300 transition ease-in-out focus:border-blue-500 focus:ring-0"
              type="text"
              value={ input }
              placeholder="Add task"
              onChange={ (event) => setInput(event.target.value) }
            />
            <button
              className="bg-blue-500 text-white rounded-full p-2 focus:rounded-full focus:outline-none focus:outline-off-2 focus:outline-blue-500 focus:bg-blue-600 duration-300 transition ease-in-out hover:bg-blue-600"
            >
              <AddTaskIcon className="h-6 w-6" />
            </button>
            <ToastContainer
              position="top-center"
              autoClose={ 1000 }
              hideProgressBar
              newestOnTop={ false }
              closeOnClick
              rtl={ false }
              pauseOnFocusLoss={ false }
              draggable
              pauseOnHover
              theme="colored"
            />
          </form>
          <ul>
            {
              todo.map((todo) => (
                <Todo
                  key={ todo }
                  todo={ todo }
                  toggleTodo={ handleToggleTodo }
                  deleteTodo={ handleDeleteTodo }
                />
              ))
            }
          </ul>
          {
            todo.length < 1
            ? null
            : <p className="text-sm text-center mt-4 text-slate-500"> { `You have ${ todo.length } ${ todo.length > 1 ? "todos" : "todo" }` } </p>
          }
        </div>
      </div>
    </>
  )
}

export default TodoList
