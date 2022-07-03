import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth"

//Firebase project configuartion
const firebaseConfig = {
  apiKey: "AIzaSyCblHt-fHP--1m_kIEZWvtyQ9BDgqP0GP4",
  authDomain: "assignment-c3557.firebaseapp.com",
  databaseURL: "https://assignment-c3557-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assignment-c3557",
  storageBucket: "assignment-c3557.appspot.com",
  messagingSenderId: "637849128468",
  appId: "1:637849128468:web:623b833c73d26ee311a101"
};

//Initialize app 
const app = initializeApp(firebaseConfig);
//Get authorization info
const auth = getAuth(app)
const db = getFirestore(app)

export {
    auth,
    db,
    signOut
}