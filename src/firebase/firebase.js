import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe4puT9EFcz5BGa75xjipJmhUTxTZKFIk",
  authDomain: "ak-jol.firebaseapp.com",
  projectId: "ak-jol",
  storageBucket: "ak-jol.appspot.com",
  messagingSenderId: "448099531547",
  appId: "1:448099531547:web:00967b7a42b777f95c31be",
  measurementId: "G-N8LCBZTPX3",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);


export const login = async (e, p) => {
  await signInWithEmailAndPassword(auth, e, p)
};

export const logout = () => signOut(auth);

export const usersRef = collection(db, "users")