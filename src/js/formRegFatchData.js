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
console.log(dataRead);// обєкт що є в локал сторед

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
const db = getDatabase(firebaseApp); 


// =====відправленя даних в базу 
function writeUserData(userId, name, email, myDataNews) {
	set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    newsRead: myDataNews,
  });
}

// =====отримання даних з бази
function setUserData(userId) {
	const starCountRef = ref(db, 'users/' + userId + '/newsRead');
	onValue(starCountRef, (snapshot) => {
	  const data = snapshot.val();
	  console.log(data);
	});
}

// =====повертає користувача якщо він є
const loginEmailPasword = async evt => {
  evt.preventDefault();

  btnFormLogin.disabled = true;
  btnRegister.disabled = true;
  btnLogout.disabled = false;

 	const loginEmail = textEmail.value;
	const loginPassword = textPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    const myUserID = userCredential.user.uid;
    console.log(myUserID);
    writeUserData(myUserID, loginPassword, loginEmail, dataRead);
  } catch (error) {
    console.log(error);
    formMacup(formMessage, 'Invalid address or register', 'red'); //==============================================
  
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
    formMacup(formMessage, error.message, 'red'); //===================================
  }
};

btnRegister.addEventListener('click', createAccount);

// =====перевірка чи зареєстрований користувач зараз
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      formMacup(formMessage, 'Login is complete', 'green');
      btnFormLogin.disabled = true;
      btnRegister.disabled = true;
      btnLogout.disabled = false;
    } else {
      formMacup(formMessage, 'Log in not done', 'orange');
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
  formMacup(formMessage, 'Enter the data or register', 'orange');
  await signOut(auth);
};

btnLogout.addEventListener('click', Logout);

function formMacup(elem, message, color) {
  const infoMessage = `
  <p class="form__message--text" style="color: ${color}";">${message}</p>`;
  elem.innerHTML = '';
  elem.insertAdjacentHTML('beforeend', infoMessage);
}
// =========================================================




























































