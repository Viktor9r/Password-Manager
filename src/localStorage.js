import usersFromServer from './api/users.json';
import passwordsFromServer from './api/passwords.json';

localStorage.setItem('passwordsFromServer', JSON.stringify(passwordsFromServer));
localStorage.setItem('usersFromServer', JSON.stringify(usersFromServer));
