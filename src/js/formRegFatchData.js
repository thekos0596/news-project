// імпорт бази даних
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const form = document.querySelector('.form');
const textEmail = document.querySelector('.form__input--email');
const textPassword = document.querySelector('.form__input--password');
const btnFormLogin = document.querySelector('.form__button--logIn');
const btnRegister = document.querySelector('.form__button--register');
const btnLogout = document.querySelector('.form__button--logOut');
const formMessage = document.querySelector('.form__message');

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBhJ5beXwmy_ttB_5GIAo765d2PbOi8cTk',
  authDomain: 'news-my-first-projec.firebaseapp.com',
  databaseURL: 'https://news-my-first-projec-default-rtdb.firebaseio.com',
  projectId: 'news-my-first-projec',
  storageBucket: 'news-my-first-projec.appspot.com',
  messagingSenderId: '356584807543',
  appId: '1:356584807543:web:4b5836cecd17ec95b6ba72',
});

// Initialize Firebase
const auth = getAuth(firebaseApp);

// запит повертає користувача у випадку якщо він є в базі
const loginEmailPasword = async evt => {
  evt.preventDefault();
  const loginEmail = textEmail.value;
  const loginPassword = textPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
  }
};
btnFormLogin.addEventListener('click', loginEmailPasword);

// дія реєстрації акаунту
const createAccount = async evt => {
  evt.preventDefault();
  const loginEmail = textEmail.value;
  const loginPassword = textPassword.value;
  console.log(loginEmail, loginPassword);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
	
  } catch (error) {
    console.log(error.message);
	formMacup(formMessage, error.message)
  }
};

btnRegister.addEventListener('click', createAccount);

// перевірка чи зареєстрований користувач зараз
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
	  formMacup(formMessage, 'Вхід виконано')
	  btnFormLogin.disabled = true;
	  btnRegister.disabled = true;
	  btnLogout.disabled = false;

    } else {
		formMacup(formMessage, 'Вхід не виконано')
		btnLogout.disabled = true;
    }
  });
};

monitorAuthState();

// вихід з сайту
const Logout = async () => {
  await signOut(auth);
};

btnLogout.addEventListener('click', Logout);

function formMacup (elem, message) {
	const infoMessage = `<p class="form__message--text">${message}</p>`
	elem.innerHTML = ''
	elem.insertAdjacentHTML('beforeend', infoMessage);
}
// =========================================================
// запускаэм базу даних
const db = getDatabase(firebaseApp);

// ?Отримання посилання на вузол /users/1 у базі даних
const userRef = ref(db, 'users/1');

//? Дані, які потрібно записати
// const userData = {
//   name: "John",
//   age: 30,
//   email: "john@example.com"
// };

// ?  запис куди       що
	// set(userRef, userData);
// ==============================

// ? =====  отримати дані
// get(userRef).then((snapshot) => {
// 	if (snapshot.exists()) {
// 	  const userData = snapshot.val();
// 	  console.log(userData);
// 	} else {
// 	  console.log("No data available");
// 	}
//   }).catch((error) => {
// 	console.error(error);
//   });
