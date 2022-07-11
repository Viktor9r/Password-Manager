/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import classNames from 'classnames';
import './PasswordsList.scss';
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
    <div className="passwords">
      {visiblePasswords.length !== 0
        ? (
          <>
            {listVisible && (
              <>
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
                  className="password__back"
                  onClick={backLogin}
                >
                  Back to sign in
                </button>
                <div className="passwords__title-list">Your paswords:</div>
              </>
            )}
          </>
        )
        : ''}
      {listVisible && (
        <>
          <ul className="passwords__list">
            {visiblePasswords.map(password => (
              <li
                key={password.id}
                className={classNames('password__item', {
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
                      <button
                        type="button"
                        className="passwords__edit"
                        onClick={() => setSelectedPasswordId(0)}
                      >
                        Cancel
                      </button>
                      <UpdatePasswordForm
                        loadPasswords={loadPasswords}
                        passId={password.id}
                        setSelectedPasswordId={setSelectedPasswordId}
                      />
                    </>
                  )
                  : (
                    <>
                      <button
                        type="button"
                        className={classNames('password__edit', {
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
      )}
    </div>
  );
};
