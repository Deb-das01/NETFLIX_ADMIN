import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//This below line refers to the storage that you created in your firebase 
const firebaseConfig = {
    apiKey: "AIzaSyBOsGgRyeXBFDwgSalLPOY0uT1jZVYcqj4",
    authDomain: "netflix-3123f.firebaseapp.com",
    projectId: "netflix-3123f",
    storageBucket: "netflix-3123f.appspot.com",
    messagingSenderId: "379303867846",
    appId: "1:379303867846:web:e48715549dda2b96b9aec7",
    measurementId: "G-1XTL5PTMEY"
  };

  //The below line initializes Firebase with the provided configuration.
  //This step is necessary before you can use any Firebase services in your application.
  firebase.initializeApp(firebaseConfig);

  // The below line creates a reference to the Firebase Storage service. 
  //This allows you to interact with Firebase Storage, such as uploading, downloading, and managing files.
  const storage=firebase.storage();
  export default storage;
  