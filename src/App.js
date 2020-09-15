import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

//cari cara ubah edit dengan onchange

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const inputVal = useRef();

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodo) setTodos(storedTodo);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function complete(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    // console.log(todo);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function remove(id) {
    const newTodos = [...todos];
    const todo = newTodos.filter((todo) => todo.id !== id);
    setTodos(todo);
  }

  function edit(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.edit = !todo.edit;
    setTodos(newTodos);
  }

  function done(id, inputValue) {
    const value = inputValue;
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.name = value;
    todo.edit = false;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const value = inputVal.current.value;

    if (value === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuidv4(), name: value, complete: false, edit: false },
      ];
    });

    inputVal.current.value = null;
  }

  function handleFilterComplete(e) {}

  return (
    <>
      <input type="text" ref={inputVal} />
      <button onClick={handleAddTodo}>Add</button>
      <button id="sorting">Sort</button>
      <button onClick={handleFilterComplete}>Filter Complete</button>
      <button id="filterUncom">Filter Not Complete</button>
      <TodoList
        todos={todos}
        complete={complete}
        edit={edit}
        remove={remove}
        done={done}
      />
    </>
  );
}

export default App;
