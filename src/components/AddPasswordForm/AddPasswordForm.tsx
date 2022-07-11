/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
} from 'react';
import './AddPasswordForm.scss';
import passwordsFromServer from '../../api/passwords.json';

type Props = {
  passwords: PasswordNew[],
  loadPasswords: () => void,
  userId: number,
};

export const AddPasswordForm: React.FC<Props> = ({
  loadPasswords,
  userId,
  passwords,
}) => {
  console.log(passwords, userId);
  const [newApp, setNewApp] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewApp(event.target.value);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const getNewPassword = () => {
    const oldPasswords = JSON.parse(localStorage.getItem('passwordsFromServer') || '[]');

    const maxId = oldPasswords.reduce((acc: { b: number; }, curr: { b: number; }) => (
      acc.b > curr.b ? acc : curr
    ));

    console.log(maxId.id);
    const addedPassword: PasswordNew = {
      id: maxId.id + 1,
      userId,
      application: newApp,
      appLogin: newLogin,
      appPassword: newPassword,
    };

    return addedPassword;
  };

  const addPassword = (addedPassword: PasswordNew) => {
    const oldPasswords = JSON.parse(localStorage.getItem('passwordsFromServer') || '[]');

    const listWithAddedPassword = [...oldPasswords, addedPassword];

    localStorage.setItem('passwordsFromServer', JSON.stringify(listWithAddedPassword));

    /* setPasswords(listWithAddedPassword); */
    console.log(oldPasswords);
  };

  const clearState = () => {
    setNewApp('');
    setNewLogin('');
    setNewPassword('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const addedPassword = getNewPassword();

    addPassword(addedPassword);
    loadPasswords();
    clearState();
  };

  return (
    <div className="add">
      <form
        className="add__form"
        onSubmit={handleSubmit}
        method="post"
      >
        <input
          type="text"
          placeholder="Enter application title"
          className="add__input add__input--app"
          onChange={handleAppChange}
          value={newApp}
          required
        />
        <input
          type="text"
          placeholder="Enter new login"
          className="add__input add__input--log"
          onChange={handleLoginChange}
          value={newLogin}
          required
        />
        <input
          type="text"
          placeholder="Enter password"
          className="add__input add__input--pass"
          onChange={handlePasswordChange}
          value={newPassword}
          required
        />
        <button
          className="add__submit"
          type="submit"
        >
          Add password
        </button>
      </form>
    </div>
  );
};
