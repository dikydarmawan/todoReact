import React, { useRef, useEffect } from "react";

export default function Todo({ todo, complete, remove, edit, done }) {
  const text = useRef(null);

  useEffect(() => {
    if (text.current) {
      text.current.value = todo.name;
    }
  }, [text]);

  function handleComplete() {
    complete(todo.id);
  }

  function handleDelete() {
    remove(todo.id);
  }

  function handleEdit() {
    edit(todo.id);
  }

  function handleDone() {
    done(todo.id, text.current.value);
  }

  if (todo.complete) {
    return (
      <li>
        <s>
          {todo.id}. {todo.name}
          <span> </span>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleComplete}>✔️</button>
        </s>
      </li>
    );
  } else if (todo.edit) {
    return (
      <li>
        <input type="text" ref={text} />
        <span> </span>
        <button onClick={handleEdit}>cancel</button>
        <button onClick={handleDone}>done</button>
      </li>
    );
  } else {
    return (
      <li>
        {todo.id}. {todo.name}
        <span> </span>
        <button onClick={handleDelete}>delete</button>
        <button onClick={handleEdit}>edit</button>
        <button onClick={handleComplete}>✔️</button>
      </li>
    );
  }
}
