import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, complete, remove, edit, done }) {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            complete={complete}
            remove={remove}
            edit={edit}
            done={done}
            todo={todo}
          />
        );
      })}
    </ul>
  );
}
