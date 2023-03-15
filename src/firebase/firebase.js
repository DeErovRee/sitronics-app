import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2SYyjn_jeeheoBdPU9PchZth8rsYqaic",
  authDomain: "learn-react-chat-1b947.firebaseapp.com",
  databaseURL:
    "https://learn-react-chat-1b947-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-react-chat-1b947",
  storageBucket: "learn-react-chat-1b947.appspot.com",
  messagingSenderId: "569675092535",
  appId: "1:569675092535:web:6a5ce93d4aef7ef4e325b2",
  measurementId: "G-DR4FCX22PW",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
