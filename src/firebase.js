import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import firebaseConfig from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const firebaseEngine = { db, auth };
export default firebaseEngine;
