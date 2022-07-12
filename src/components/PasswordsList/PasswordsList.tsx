/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import classNames from 'classnames';
import './PasswordsList.scss';
import '../Password/Password.scss';
import '../UpdatePasswordForm/UpdatePasswordForm.scss';
import { Password } from '../Password/Password';
import { AddPasswordForm } from '../AddPasswordForm/AddPasswordForm';
import { UpdatePasswordForm } from '../UpdatePasswordForm/UpdatePasswordForm';

type Props = {
  userId: number,
  passwordsList: PasswordNew[],
  userLogin: string,
  loadPasswords: () => void,
  setLoginVisible: Dispatch<SetStateAction<boolean>>,
  listVisible: boolean,
  setVisibleList: Dispatch<SetStateAction<boolean>>,
};

export const PasswordsList: React.FC<Props> = ({
  loadPasswords,
  userLogin,
  userId,
  passwordsList,
  setLoginVisible,
  listVisible,
  setVisibleList,
}) => {
  const [selectedPasswordId, setSelectedPasswordId] = useState(0);
  const visiblePasswords = passwordsList.filter(password => password.userId === userId);

  const backLogin = () => {
    setVisibleList(false);
    setLoginVisible(true);
  };

  return (
    <>
      {visiblePasswords.length !== 0
        ? (
          <>
            {listVisible && (
              <>
                <div className="passwords">
                  <div className="passwords__title">
                    Welcome,
                    {' '}
                    {userLogin}
                  </div>
                  <AddPasswordForm
                    passwords={visiblePasswords}
                    loadPasswords={loadPasswords}
                    userId={userId}
                  />
                  <button
                    type="button"
                    className="password__button password__button--back"
                    onClick={backLogin}
                  >
                    Back to sign in
                  </button>
                </div>
              </>
            )}
          </>
        )
        : <div className="hidden"></div>}
      {listVisible && visiblePasswords.length !== 0 ? (
        <>
          <ul className="passwords__list">
            <div className="passwords__title-list">Your passwords:</div>
            {visiblePasswords.map(password => (
              <li
                key={password.id}
                className={classNames('passwords__item', {
                  hidden: password.application.length === 0
                && password.appLogin.length === 0 && password.appPassword.length === 0,
                })}
              >
                <Password
                  password={password}
                  passId={password.id}
                  loadPasswords={loadPasswords}
                />
                {selectedPasswordId === password.id
                  ? (
                    <>
                      <UpdatePasswordForm
                        loadPasswords={loadPasswords}
                        passId={password.id}
                        setSelectedPasswordId={setSelectedPasswordId}
                      />
                      <button
                        type="button"
                        className="update__button"
                        onClick={() => setSelectedPasswordId(0)}
                      >
                        Cancel
                      </button>
                    </>
                  )
                  : (
                    <>
                      <button
                        type="button"
                        className={classNames('password__button password__button--update', {
                          hidden: password.application.length === 0
                        && password.appLogin.length === 0 && password.appPassword.length === 0,
                        })}
                        onClick={() => setSelectedPasswordId(password.id)}
                      >
                        Update
                      </button>
                    </>
                  )}
              </li>
            ))}
          </ul>
        </>
      )
        : (<div className="hidden"></div>)}
    </>
  );
};
