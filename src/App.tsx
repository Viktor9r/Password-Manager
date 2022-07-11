/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import usersFromServer from './api/users.json';
import passwordsFromServer from './api/passwords.json';

const loadDataOnce = () => {
  localStorage.setItem('passwordsFromServer', JSON.stringify(passwordsFromServer));
  localStorage.setItem('usersFromServer', JSON.stringify(usersFromServer));
};

export const App: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordNew[]>([]);
  const [users, setUsers] = useState<UserNew[]>([]);
  const loadUsers = () => {
    const localUsers = JSON.parse(localStorage.getItem('usersFromServer') || '[]');

    setUsers(localUsers);
  };

  useEffect(() => {
    loadDataOnce();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [setUsers]);

  const loadPasswords = () => {
    const localPasswords: PasswordNew[] = JSON.parse(localStorage.getItem('passwordsFromServer') || '[]');

    setPasswords(localPasswords);
    console.log(localPasswords);
  };

  useEffect(() => {
    loadPasswords();
  }, [setPasswords]);

  console.log(users);

  return (
    <div className="page">
      <Login
        users={users}
        passwords={passwords}
        loadPasswords={loadPasswords}
        loadUsers={loadUsers}
      />
    </div>
  );
};
