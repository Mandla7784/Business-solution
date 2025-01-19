const firebaseConfig = {
  apiKey: "AIzaSyDZb3TH-U1JNJKMr2wNYHuhg94WVQMSa_A",
  authDomain: "shoppinglist-8afb5.firebaseapp.com",
  projectId: "shoppinglist-8afb5",
  storageBucket: "shoppinglist-8afb5.appspot.com",
  messagingSenderId: "1053775639867",
  appId: "1:1053775639867:web:868f64621e0540f7fa731e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const message = "Login Successful!";

// Login with googl fucntionality
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
const provider = new firebase.auth.GoogleAuthProvider();
const loginWithGoogleButton = document.querySelector(".google");
const loginWithEmailAndPasswordButton = document.getElementById("loginButton");
loginWithGoogleButton.addEventListener("click", () => {
  auth
    .signInWithPopup(provider)
    .then((results) => {
      const user = results.user;
      alert(`Welcome ${user.displayName}`);
    })
    .catch((error) => {
      alert(error.message);
    });
});

const email = "Mndla@gamil.com";
const password = "5456";

// Log in with email and password
loginWithEmailAndPasswordButton.addEventListener("click", function () {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((credentials) => {
      const user = credentials.user;
      console.log(user);
      alert(message);
    })
    .catch((erro) => {
      alert(`Errror ${erro.message}`);
    });
});
