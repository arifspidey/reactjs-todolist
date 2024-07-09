import { useEffect, useState } from "react"
import TodoInput from "./componets/TodoInput"
import TodoList from "./componets/TodoList"


function App() {

  const [todos, setTodos] = useState([
    'Gym',
    'Eat fruit',
    'Eat veg'
  ])

  const [todoValue, setTodoValue] = useState('')

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos,newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo,todoIndex)=>{
      return todoIndex != index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  //implementing local storage using useEffect and persistData
  //listens for changes
  useEffect(() => {
    if(!localStorage){return}//guard clause

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){return}//another one
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, []) //empty array: runs on page load

  function persistData(newList) { //place into function that modify
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  return (
    <>
      <TodoInput 
      todoValue={todoValue}
      setTodoValue={setTodoValue} 
      handleAddTodos={handleAddTodos}/>
      <TodoList 
      handleDeleteTodo={handleDeleteTodo} 
      handleEditTodo={handleEditTodo}
      todos={todos}/>  
    </>
  )
}

export default App
