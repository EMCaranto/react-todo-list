import React from 'react'

// stylesheets
import DeleteTaskIcon from '../icons/DeleteTaskIcon'

function Todo({ todo, toggleTodo, deleteTodo }) {
  return (
    <>
      <li
        className={
          !todo.completed
          ? "my-2 flex justify-between items-center capitalize bg-slate-50 rounded-lg shadow-lg overflow-hidden duration-300 transform ease-in-out hover:bg-slate-200"
          : "my-2 flex justify-between items-center capitalize bg-slate-50 rounded-lg shadow-sm overflow-hidden duration-300 transform ease-in-out hover:bg-slate-200"
        }
      >
        <div className="flex flex-grow flex-between">
          <div className={
            !todo.completed
            ? "p-1 bg-slate-400 duration-300 transform ease-in-out"
            : "p-1 bg-blue-500 duration-300 transform ease-in-out"
          }>
          </div>
          <div className="flex w-full items-center p-4">
            <input
            className="form-checkbox rounded bg-slate-50 border-slate-500 me-4 text-blue-500 focus:outline-blue-500"
            type="checkbox"
            checked={
              !todo.completed
              ? ""
              : "checked"
            }
            onChange={ () => toggleTodo(todo) }
          />
          <div
            className="flex-grow"
            onClick={ () => toggleTodo(todo) }
          >
            <p
              className={
                !todo.completed
                ? "text-sm text-slate-700 font-bold"
                : "text-sm text-slate-400 font-bold"
              }
            >
              { todo.task }
            </p>
          </div>
        </div>
        <div
          className="flex justify-center items-center"
          onClick={ () => deleteTodo(todo.id) }
        >
          <button className="bg-slate-100 p-4 text-slate-700 outline-none focus:outline-none focus:text-white focus:bg-red-500 hover:text-white hover:bg-red-500 duration-300 transition ease-in-out">
            <DeleteTaskIcon className="h-6 w-6" />
          </button>
        </div>
        </div>
      </li>
    </>
  )
}

export default Todo
