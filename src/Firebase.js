import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBdZ6o2Vx31zbi82sTeX4xAHTSG62VwTuU",
  authDomain: "api-firebase-1c6fb.firebaseapp.com",
  projectId: "api-firebase-1c6fb",
  storageBucket: "api-firebase-1c6fb.appspot.com",
  messagingSenderId: "4735381892",
  appId: "1:4735381892:web:4982e33ab0954c2f25add1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
