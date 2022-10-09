import {getFirestore} from "firebase/firestore";
import {FirebaseOptions, initializeApp} from "firebase/app";

const appConfig:FirebaseOptions = {
    apiKey: "AIzaSyAZnyv58gsxvNFBvYLcOFId0gTmpBVk9TA",
    authDomain: "vue-dashboard-c3a6f.firebaseapp.com",
    projectId: "vue-dashboard-c3a6f",
    storageBucket: "vue-dashboard-c3a6f.appspot.com",
    messagingSenderId: "526776945900",
    appId: "1:526776945900:web:ad70e1904b6077312769c9"
}

const app = initializeApp(appConfig);
const db = getFirestore(app);

export default db;
