import * as firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5Xph1yPLyuZcoeAnvgzTtoTO4A2Jpg3Y",
  authDomain: "pathways-429eb.firebaseapp.com",
  databaseURL: "https://pathways-429eb.firebaseio.com",
  projectId: "pathways-429eb",
  storageBucket: "pathways-429eb.appspot.com",
  messagingSenderId: "787179059970",
  appId: "1:787179059970:web:cd0ad3a48eced7089ce01b",
  measurementId: "G-2K1SZRR87N"
};

firebase.initializeApp(firebaseConfig);

// export const geo = geofirex.init(firebase);
// export const GOOGLE_API = "AIzaSyAzny6yRXLVY91uAUPZAKRtwpU3pMcP7VI";

export default firebase;
