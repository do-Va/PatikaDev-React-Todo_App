import React, { useState, useEffect } from 'react';
import Todos from './components/Todos';
import './styles/todoApp.scss';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [alert, setAlert] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      setAlert('You cannot add empty item.');
      setTimeout(() => {
        setAlert('');
      }, 2000);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        isChecked: false,
      };
      setList([...list, newItem]);
      setName('');
    }
  };

  const clearList = () => {
    setList([]);
  };

  const checkedHandler = id => {
    setList(
      list.map(item => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }

        return item;
      })
    );
  };

  const removeItem = id => {
    setList(list.filter(item => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className="todo">
      <div className="todo-container">
        <div className="todo-header">
          <h1 className="todo-title">TODO LIST</h1>
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              className="form-input"
              placeholder="add items to your to-do list ..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button type="submit" className="form-btn">
              ADD
            </button>
          </form>
          <div className="alert-container">
            <p>{alert}</p>
          </div>
        </div>
        <Todos
          items={list}
          removeItem={removeItem}
          checkedHandler={checkedHandler}
        />
        <div className="todo-footer">
          <button className="footer-btn" onClick={clearList}>
            CLEAR ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
