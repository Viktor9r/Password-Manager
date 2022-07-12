/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import './Registration.scss';

type Props = {
  setShowRegistration: Dispatch<SetStateAction<boolean>>,
  setIsUserReg: Dispatch<SetStateAction<boolean>>,
  loadUsers: () => void,
  setLoginVisible: Dispatch<SetStateAction<boolean>>,
  loadPasswords: () => void,
  passwords: PasswordNew[],
  setShowError: Dispatch<SetStateAction<boolean>>,
  isUserReg: boolean,
  setPasswordLengthError: Dispatch<SetStateAction<boolean>>,
  passwordLengthError: boolean,
};

export const Registration: React.FC<Props> = ({
  setShowRegistration,
  setIsUserReg,
  loadUsers,
  setLoginVisible,
  loadPasswords,
  passwords,
  setShowError,
  isUserReg,
  setPasswordLengthError,
  passwordLengthError,
}) => {
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const clearForm = () => {
    setNewLogin('');
    setNewPassword('');
  };

  const getNewUser = () => {
    const oldUsers = JSON.parse(localStorage.getItem('usersFromServer') || '[]');

    if (oldUsers.some((oldUser: { login: string; password: string; }) => oldUser.login === newLogin
      || oldUser.password === newPassword)) {
      setIsUserReg(true);

      return null;
    }

    const addedUser: UserNew = {
      id: oldUsers.length + 1,
      login: newLogin,
      password: newPassword,
    };

    return addedUser;
  };

  const backToLogin = () => {
    setShowRegistration(false);
    setLoginVisible(true);
    setIsUserReg(false);
    setShowError(false);
    setPasswordLengthError(false);
  };

  const addUser = (addedUser: UserNew) => {
    const oldUsers = JSON.parse(localStorage.getItem('usersFromServer') || '[]');

    const listWithAddedUser = [...oldUsers, addedUser];

    localStorage.setItem('usersFromServer', JSON.stringify(listWithAddedUser));
    if (passwords.length > 1) {
      const maxId = passwords.reduce((acc, curr) => (
        acc.b > curr.b ? acc : curr
      ));
      const hiddenPassword: PasswordNew = {
        id: maxId.id + 1,
        userId: addedUser.id,
        application: '',
        appLogin: '',
        appPassword: '',
      };
      const listWithHiddenPassword = [...passwords, hiddenPassword];

      localStorage.setItem('passwordsFromServer', JSON.stringify(listWithHiddenPassword));
    } else {
      const hiddenPassword: PasswordNew = {
        id: passwords.length + 1,
        userId: addedUser.id,
        application: '',
        appLogin: '',
        appPassword: '',
      };
      const listWithHiddenPassword = [...passwords, hiddenPassword];

      localStorage.setItem('passwordsFromServer', JSON.stringify(listWithHiddenPassword));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const addedUser = getNewUser();

    if (addedUser && newPassword.length >= 6) {
      addUser(addedUser);
      setShowRegistration(false);
      setLoginVisible(true);
      setIsUserReg(false);
      setPasswordLengthError(false);
    } else {
      setIsUserReg(true);
      setPasswordLengthError(false);
    }

    loadUsers();
    loadPasswords();
    setShowError(false);

    clearForm();
  };

  return (
    <div className="registration">
      <form
        className="registration__form"
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="registration__title">Registration:</div>
        <input
          type="text"
          className={classNames('registration__field registration__field--login', {
            registration__field_error: isUserReg || passwordLengthError,
          })}
          placeholder="Login"
          value={newLogin}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          className={classNames('registration__field registration__field--password', {
            registration__field_error: isUserReg || passwordLengthError,
          })}
          placeholder="Password"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />
        <button
          type="submit"
          className="registration__button"
        >
          Sign Up
        </button>
      </form>
      <button
        type="button"
        className="registration__button registration__login"
        onClick={backToLogin}
      >
        Back to sign in
      </button>
    </div>
  );
};
