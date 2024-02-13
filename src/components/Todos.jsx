import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo, toggleCompleted } from '../features/Todoslice';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = (id, text, completed) => {
    
    if (!completed) {
      if (!editingTodoId) {
        setEditingTodoId(id);
        setEditedText(text);
      } else {
        
        dispatch(editTodo({ id: editingTodoId, newText: editedText }));
        setEditingTodoId(id);
        setEditedText(text);
      }
    }
  };

  const handleSaveClick = (id) => {
    dispatch(editTodo({ id, newText: editedText }));
    setEditingTodoId(null);
    setEditedText('');
  };

  const handleTodoClick = (id, completed) => {
    
    dispatch(toggleCompleted({ id }));
  };

  const handleDeleteClick = (id, completed) => {
    
    if (!completed) {
      dispatch(removeTodo(id));
    }
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded ${
              todo.completed ? 'completed-task' : ''
            }`}
            onClick={() => handleTodoClick(todo.id, todo.completed)}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleSaveClick(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <div className={`text-white ${todo.completed ? 'completed-text' : ''}`}>
                  {todo.text}
                </div>
                <button
                  onClick={() => handleEditClick(todo.id, todo.text, todo.completed)}
                  className={`edit-button ${
                    todo.completed ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {todo.completed ? '📁' : '✏️'}
                </button>
                <button
                  onClick={() => handleDeleteClick(todo.id, todo.completed)}
                  className={`delete-button ${
                    todo.completed ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  ❌
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
