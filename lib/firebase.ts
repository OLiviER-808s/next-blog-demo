import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTkuwNnwNhvOzjf81ErRr3riY3l6PJOFU",
  authDomain: "blog-app-5-a35f8.firebaseapp.com",
  projectId: "blog-app-5-a35f8",
  storageBucket: "blog-app-5-a35f8.appspot.com",
  messagingSenderId: "34260162681",
  appId: "1:34260162681:web:d37a3d6a5d6e1a8d565ca8",
  measurementId: "G-N3CD2FRLHG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();

export const googleProvider = new GoogleAuthProvider()

export const timestamp = () => serverTimestamp()

export const postToJSON = (data: any) => {
  return { ...data, createdAt: data.createdAt.toMillis() }
}
  
