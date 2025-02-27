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

function signInWithGoogle() {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const loginWithGoogleButton = document.querySelector(".google");

  loginWithGoogleButton.addEventListener("click", () => {
    auth
      .signInWithPopup(provider)
      .then((results) => {
        const user = results.user;
        alert(`Welcome ${user.displayName}`);
        let badge = document.createElement("div");
        badge.textContent = message;
        badge.classList.add("alert");
        document.body.prepend(badge);

        setTimeout(function () {
          document.body.removeChild(badge);
        }, 3000);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  setTimeout(function () {
    loginWithGoogleButton.href = "/index.html";
  }, 2000);
}

// Log in with email and password
const loginWithEmailAndPasswordButton = document.getElementById("loginButton");

function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  loginWithEmailAndPasswordButton.addEventListener("click", function () {
    console.log(email);
    console.log(password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        const user = credentials.user;
        console.log("Signed as :", user.email);
        alert(message);
      })
      .catch((erro) => {
        alert(email.value, password.value);
      });
  });
}

// Sign up with Facebook
const FacebookAuth = new firebase.auth.FacebookAuthProvider();
const signInwithFaceBookButton = document.querySelector("#facebook");
// aunheticate user via popup
signInwithFaceBookButton.addEventListener("click", function () {
  auth
    .signInWithPopup(FacebookAuth)
    .then((res) => {
      console.log("User signed in", res.user);
    })
    .catch((error) => {
      alert("Error signing i n", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  signIn();
  signInWithGoogle();
});
