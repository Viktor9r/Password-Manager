/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import './UpdatePasswordForm.scss';

type Props = {
  loadPasswords: () => void,
  passId: number,
  setSelectedPasswordId: Dispatch<SetStateAction<number>>,
};

export const UpdatePasswordForm: React.FC<Props> = ({
  loadPasswords,
  passId,
  setSelectedPasswordId,
}) => {
  const [newApp, setNewApp] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const clearForm = () => {
    setNewApp('');
    setNewLogin('');
    setNewPassword('');
  };

  const updatePasswordInfo = () => {
    const oldPasswords = JSON.parse(localStorage.getItem('passwordsFromServer') || '[]');

    const listWithUpdatedPassword = oldPasswords.map((oldPassword: { id: number; }) => {
      if (oldPassword.id !== passId) {
        return oldPassword;
      }

      return {
        ...oldPassword,
        application: newApp,
        appLogin: newLogin,
        appPassword: newPassword,
      };
    });

    localStorage.setItem('passwordsFromServer', JSON.stringify(listWithUpdatedPassword));
  };

  const handleAppChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewApp(event.target.value);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePasswordInfo();
    loadPasswords();

    console.log(newApp, newLogin, newPassword);
    clearForm();
    setSelectedPasswordId(0);
  };

  return (
    <div className="update">
      <form
        className="update__form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="update__field"
          placeholder="New Site/App"
          value={newApp}
          onChange={handleAppChange}
        />
        <input
          type="text"
          className="update__field"
          placeholder="New Login"
          value={newLogin}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          className="update__field"
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="update__button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
