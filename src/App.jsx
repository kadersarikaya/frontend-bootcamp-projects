import { useState } from 'react';
import "./App.css"
import 'bulma/css/bulma.min.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Örnek Görev 1', completed: false },
    { id: 2, text: 'Örnek Görev 2', completed: true },
    { id: 3, text: 'Örnek Görev 3', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [filter, setFilter] = useState("all");
  const addTask = () => {
    if (!newTask) {
      return;
    }
    const newId = Math.max(...tasks.map(task => task.id), 0) + 1;
    const updatedTasks = [...tasks, { id: newId, text: newTask }]; //fonksiyon içinde değişey özellik güncelle id ve text
    setTasks(updatedTasks);
    setNewTask('');
  };

  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = id => {
    const taskToEdit = tasks.find(task => task.id === id)
    setEditingTaskId(id)
    setEditedTask(taskToEdit.text)
  }

  const updateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, id: editingTaskId, text: editedTask } : task
    );
    if (editedTask) {
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditedTask('');
    }

  };

  const toggleTask = id => {
    const updatedTask = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTask)
  };

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'uncompleted':
        return tasks.filter(task => !task.completed);
      default:
        return ([...tasks]);
    }
  };

  return (
    <>
      <h1 className='title' >Your ToDo List ✅</h1>
      <div className='container' >
        <div className="">
          <div className="select">
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
          <div className="flex">
            <input
              className='input'
              type="text"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
            />
            <button className="button is-primary" onClick={addTask}>Ekle</button>
          </div>
          <ul className='todo-list' >
            {filterTasks().map(task => (
              <li className='todo-list-item' key={task.id}>
                {editingTaskId === task.id ? (
                  <div className='flex'>
                    <input
                      className='input'
                      type="text"
                      value={editedTask}
                      onChange={e => setEditedTask(e.target.value)}
                    />
                    <button onClick={updateTask} className="button is-light">Kaydet</button>
                  </div>
                ) : (
                  <div className='flex'   >
                    <div  className="">
                      <input type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        name="" id="" />
                        <span className={`task-txt ${task.completed ? "task-completed" : ""}`} >{task.text}</span>
                    </div>
                    <div className="btns flex">
                      <button className="button is-warning" onClick={() => editTask(task.id)}>Düzenle</button>
                      <button className="button is-danger" onClick={() => deleteTask(task.id)}>Sil</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;