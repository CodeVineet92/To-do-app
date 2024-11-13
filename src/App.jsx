import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setTodo(todos[index].todo);
  };

  const handleUpdate = () => {
    const updatedTodos = todos.map((item, index) =>
      index === currentTodoIndex ? { ...item, todo } : item
    );
    setTodos(updatedTodos);
    setTodo("");
    setIsEditing(false);
    setCurrentTodoIndex(null);
  };

  const handleDelete = (index) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 p-3 py-1 text-white rounded-md mx-6"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6"
            >
              Add
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.map((item, index) => (
            <div key={index} className="todo flex items-center my-2">
              <div
                className={`flex-1 ${item.isCompleted ? "line-through" : ""}`}
                onClick={() => handleToggleComplete(index)}
              >
                {item.todo}
              </div>
              <div className="buttons">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-600 hover:bg-blue-700 p-3 py-1 text-white rounded-md mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700 p-3 py-1 text-white rounded-md mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
