import React from 'react';

import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

import './App.css';
import { useAppDispatch, useAppSelector } from './hooks';
import { toggle } from './redux/theme';

const App: React.FC = () => {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  return (
    <div className={`App App-${theme.value}`}>
      <div className="theme-btn icon-btn btn-ghost" onClick={() => {
        console.log('toggle theme')
        dispatch(toggle())
      }}>
        <i className="fa-solid fa-moon"></i>
      </div>

      <a target={"_blank"} href='https://github.com/Adlemas/redux-todo' className="github-btn icon-btn btn-ghost">
        <i className="fa-brands fa-github"></i>
      </a>

      <div className="container">
        <h1 className='center title'>Todo Redux</h1>

        <AddTask />

        <TaskList />
      </div>
    </div>
  );
}

export default App;
