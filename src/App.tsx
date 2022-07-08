/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import usersFromServer from './api/users.json';
import passwordsFromServer from './api/passwords.json';

export const App: React.FC = () => {
  return (
    <div className="starter">
      Hello world
      {console.log(usersFromServer)}
      {console.log(passwordsFromServer)}
    </div>
  );
};
