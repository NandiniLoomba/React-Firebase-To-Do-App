import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseApp = initializeApp({
  //write your own key
});

const db = getFirestore(firebaseApp);

export default db;
