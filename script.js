import * as firebase from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import firebaseConfig from "./firebaseConfig.js";

const app = firebase.initializeApp(firebaseConfig);

export default { app };