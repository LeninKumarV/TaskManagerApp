import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGdFJdxjPpK8H2Tmrx1IAVzeUsvx8TAiY",
  authDomain: "taskmanagement-20bd0.firebaseapp.com",
  projectId: "taskmanagement-20bd0",
  storageBucket: "taskmanagement-20bd0.appspot.com",
  messagingSenderId: "551048460229",
  appId: "1:551048460229:web:1fcfcdb70ea94c091abdac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getDatabase(app);