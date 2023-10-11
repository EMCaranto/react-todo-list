import { collection, doc, query, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

const todoCollectionRef = collection(db, 'todos')

// Fetching data
export function fetchTodo(setTodo) {
  const todoQuery = query(todoCollectionRef)

  const unsubscribe = onSnapshot(todoQuery, (querySnapshot) => {
    let todoArray = []

    querySnapshot.forEach((doc) => {
      todoArray.push({ ...doc.data(), id: doc.id })
    })
    setTodo(todoArray)
  })
  return unsubscribe
}

// Create
export async function createTodo(task) {
  await addDoc(todoCollectionRef, {
    task,
    completed: false,
  })
}

// Delete
export async function deleteTodo(id) {
  await deleteDoc(doc(db, 'todos', id))
}

// Update
export async function toggleTodo(todo) {
  await updateDoc(doc(db, 'todos', todo.id), {
    completed: !todo.completed
  })
}
