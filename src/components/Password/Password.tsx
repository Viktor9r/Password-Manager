/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Password.scss';

type Props = {
  password: PasswordNew;
  passId: number;
  loadPasswords: () => void,
};

export const Password: React.FC<Props> = ({
  password,
  passId,
  loadPasswords,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const revealPassword = () => {
    setShowPassword(!showPassword);
  };

  const hideString = '*'.repeat(password.appPassword.length);

  const removePassword = () => {
    const oldPasswords = JSON.parse(localStorage.getItem('passwordsFromServer') || '[]');

    console.log(oldPasswords);
    console.log(passId);
    const listWithoutDeletedPassword
    = oldPasswords.filter((oldPassword: { id: number; }) => oldPassword.id !== passId);

    console.log(listWithoutDeletedPassword);
    localStorage.setItem('passwordsFromServer', JSON.stringify(listWithoutDeletedPassword));
    loadPasswords();
  };

  return (
    <div className="password">
      {password.application.length > 0
        && password.appPassword.length > 0
        && password.appLogin.length > 0
        ? (
          <>
            <div className="password__field password__app">
              Site/Application:
              {' '}
              {password.application}
            </div>
            <div className="password__field password__login">
              Login:
              {' '}
              {password.appLogin}
            </div>
            <div className="password__field password__pass">
              Password:
              {' '}
              {showPassword === true
                ? (<span>{password.appPassword}</span>)
                : (<span>{hideString}</span>)}
            </div>
            <div className="password__buttons-block">
              <button
                type="button"
                className="pasword__delete"
                onClick={() => removePassword()}
              >
                Delete password
              </button>
              <button
                type="button"
                className="password__button password__reveal"
                onClick={revealPassword}
              >
                Hide/Show Password
              </button>
            </div>
          </>
        )
        : (<div className="password__hidden"></div>)}
    </div>
  );
};
