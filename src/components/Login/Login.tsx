/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import './Login.scss';
import { PasswordsList } from '../PasswordsList/PasswordsList';
import { Registration } from '../Registration/Registration';

type Props = {
  users: UserNew[],
  passwords: PasswordNew[],
  loadPasswords: () => void,
  loadUsers: () => void,
};

export const Login: React.FC<Props> = ({
  loadPasswords,
  users,
  passwords,
  loadUsers,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userWelcome, setUserWelcome] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [isUserReg, setIsUserReg] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const [listVisible, setVisibleList] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const goToRegistration = () => {
    setShowRegistration(true);
    setLoginVisible(false);
  };

  const selectUser = () => {
    const selUser = users.find(user => user.login === login && user.password === password);

    if (selUser) {
      setSelectedUserId(selUser.id);
      setUserWelcome(selUser.login);
      setIsUserReg(!isUserReg);
      setShowRegistration(false);
      setLoginVisible(false);
      setVisibleList(true);
      setShowError(false);
    } else {
      setSelectedUserId(0);
      setShowError(true);
    }

    console.log(selUser);
    console.log(selUser?.id);
    console.log(selectedUserId);
  };

  useEffect(() => {
  }, [selectedUserId]);

  const clearState = () => {
    setLogin('');
    setPassword('');
    /* setSelectedUserId(0); */
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectUser();
    loadPasswords();
    setIsUserReg(false);

    clearState();
  };

  return (
    <>
      <div className="login">
        {loginVisible && (
          <>
            <form
              className="login__form"
              onSubmit={handleSubmit}
            >
              <div className="login__title">
                Login:
              </div>
              <input
                type="text"
                className="login__field login__field--login"
                placeholder="Enter login"
                required
                name="Login"
                value={login}
                onChange={handleLoginChange}
              />
              <input
                type="text"
                className="login__field login__field--password"
                placeholder="Enter password"
                required
                name="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {showError && (
                <>
                  <div className="login__error">
                    Input correct values, user does not exist!
                    Please, sign up. After sign up you will need to sign in again.
                  </div>
                </>
              )}
              <button
                type="submit"
                className="login__button login__button--sign"
              >
                Sign In
              </button>
              <button
                type="button"
                className="login__button login__button--reg"
                onClick={goToRegistration}
              >
                I am a new user
              </button>
            </form>
          </>
        )}
        {console.log(selectedUserId)}
      </div>
      <PasswordsList
        userId={selectedUserId}
        passwordsList={passwords}
        userLogin={userWelcome}
        loadPasswords={loadPasswords}
        setLoginVisible={setLoginVisible}
        listVisible={listVisible}
        setVisibleList={setVisibleList}
      />
      {showRegistration
       && (
         <>
           <Registration
             setShowRegistration={setShowRegistration}
             setIsUserReg={setIsUserReg}
             loadUsers={loadUsers}
             setLoginVisible={setLoginVisible}
             loadPasswords={loadPasswords}
           />
         </>
       )}
      {isUserReg && <div className="registration__already">User with the same password ot login is already registered. Please, enter other data or sign in!</div>}

    </>
  );
};
