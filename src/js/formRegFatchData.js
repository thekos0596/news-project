// =====імпорт бази даних
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// =====доступ
const form = document.querySelector('.form');
const textEmail = document.querySelector('.form__input--email');
const textPassword = document.querySelector('.form__input--password');
const btnFormLogin = document.querySelector('.form__button--logIn');
const btnRegister = document.querySelector('.form__button--register');
const btnLogout = document.querySelector('.form__button--logOut');
const formMessage = document.querySelector('.form__message');

// =====локал сторедж
const read = localStorage.getItem('readList'); // json
const dataRead = JSON.parse(read); // {}
console.log(dataRead);

// =====мій ключ до серверу
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBhJ5beXwmy_ttB_5GIAo765d2PbOi8cTk',
  authDomain: 'news-my-first-projec.firebaseapp.com',
  databaseURL: 'https://news-my-first-projec-default-rtdb.firebaseio.com',
  projectId: 'news-my-first-projec',
  storageBucket: 'news-my-first-projec.appspot.com',
  messagingSenderId: '356584807543',
  appId: '1:356584807543:web:4b5836cecd17ec95b6ba72',
});

// =====інстал фаєрбейс
const auth = getAuth(firebaseApp);

// =====отримання даних
function writeUserData(userId, name, email, myDataNews) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    newsRead: myDataNews,
  });
}

// =====повертає користувача якщо він є
const loginEmailPasword = async evt => {
  evt.preventDefault();
  const loginEmail = textEmail.value;
  const loginPassword = textPassword.value;

  btnFormLogin.disabled = true;
  btnRegister.disabled = true;
  btnLogout.disabled = false;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    const myUserID = userCredential.user.uid;
    console.log(myUserID);
    writeUserData(myUserID, loginEmail, loginPassword, dataRead);
  } catch (error) {
    console.log(error);
    formMacup(formMessage, 'Невірний адрес або зареєструйтесь');
  }
};
btnFormLogin.addEventListener('click', loginEmailPasword);

// =====дія реєстрації акаунту
const createAccount = async evt => {
  evt.preventDefault();
  const loginEmail = textEmail.value;
  const loginPassword = textPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    const myUserID = userCredential.user.uid;
    console.log(myUserID);
    writeUserData(myUserID, loginEmail, loginPassword, dataRead);
  } catch (error) {
    console.log(error.message);
    formMacup(formMessage, error.message);
  }
};

btnRegister.addEventListener('click', createAccount);

// =====перевірка чи зареєстрований користувач зараз
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      formMacup(formMessage, 'Вхід виконано');
      btnFormLogin.disabled = true;
      btnRegister.disabled = true;
      btnLogout.disabled = false;
    } else {
      formMacup(formMessage, 'Вхід не виконано');
      btnLogout.disabled = true;
    }
  });
};

monitorAuthState();

// =====вихід з сайту
const Logout = async evt => {
  evt.preventDefault();
  btnFormLogin.disabled = false;
  btnRegister.disabled = false;
  btnLogout.disabled = true;
  formMacup(formMessage, 'введытьданы або зареэструйтусь');
  await signOut(auth);
};

btnLogout.addEventListener('click', Logout);

function formMacup(elem, message) {
  const infoMessage = `<p class="form__message--text">${message}</p>`;
  elem.innerHTML = '';
  elem.insertAdjacentHTML('beforeend', infoMessage);
}
// =========================================================
