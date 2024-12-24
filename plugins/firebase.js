import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  
  // Doing something with nuxtApp
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBFbNn161ZJxBTdsObnlFocPyjr8WqLxrc",
    authDomain: "vue-todo-list-8db61.firebaseapp.com",
    projectId: "vue-todo-list-8db61",
    storageBucket: "vue-todo-list-8db61.firebasestorage.app",
    messagingSenderId: "1006014643589",
    appId: "1:1006014643589:web:320c8d31c2e8040e7e98ec",
    measurementId: "G-M4LKQQB386"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  return {
    provide: {
      firebaseApp: app,
      db
    }
  }
});