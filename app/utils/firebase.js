import * as firebase from "firebase";
import * as geofirex from "geofirex";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxDGWtvcwEpzrPqwGLKuI_jT_am5VnxZ0",
  authDomain: "pathways-d376e.firebaseapp.com",
  databaseURL: "https://pathways-d376e.firebaseio.com",
  projectId: "pathways-d376e",
  storageBucket: "pathways-d376e.appspot.com",
  messagingSenderId: "60507481498",
  appId: "1:60507481498:web:591f291ca716d52f7d0623",
  measurementId: "G-29WEG3R3JP"
};

firebase.initializeApp(firebaseConfig);

export const geo = geofirex.init(firebase);
export const GOOGLE_API = "AIzaSyAzny6yRXLVY91uAUPZAKRtwpU3pMcP7VI";

export default firebase;
