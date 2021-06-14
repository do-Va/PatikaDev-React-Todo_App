import React, { useState } from 'react';
import '../styles/todoList.scss';

function Todos({ items, removeItem, checkedHandler }) {
  return (
    <div className="todo-body">
      <ul className="todo-list">
        {items.map(item => {
          const { id, title } = item;

          return (
            <div className="list-item-container">
              <li
                className="list-item"
                key={id}
                onClick={() => checkedHandler(id)}
              >
                <div className="list-item-check">
                  <span className="border border-1"></span>
                  <span className="border border-2"></span>
                  <span className="border border-3"></span>
                  <span className="border border-4"></span>
                  <div
                    className={`list-item-check-item ${
                      item.isChecked ? 'active' : ''
                    }`}
                  ></div>
                </div>
                <p
                  className={`list-item-title ${
                    item.isChecked ? 'line-through' : ''
                  }`}
                >
                  {title}
                </p>
              </li>
              <button className="list-item-btn" onClick={() => removeItem(id)}>
                Delete
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Todos;
