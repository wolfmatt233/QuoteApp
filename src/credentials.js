import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmj61OsETTNQyzKSPJmfDdGzuhEwd4Hcg",
  authDomain: "matt-wolf-projects.firebaseapp.com",
  projectId: "matt-wolf-projects",
  storageBucket: "matt-wolf-projects.appspot.com",
  messagingSenderId: "685492920611",
  appId: "1:685492920611:web:c7ce1d83e4eb8677c1ec96",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
