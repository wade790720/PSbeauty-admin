import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzu4iFHYHhXrXByuCU25u7kpgW6b49WEA",
  authDomain: "inspiring-grove-348006.firebaseapp.com",
  projectId: "inspiring-grove-348006",
  storageBucket: "inspiring-grove-348006.appspot.com",
  messagingSenderId: "776282504981",
  appId: "1:776282504981:web:b845a75ff414fcfbbef31c",
}

const app = initializeApp(firebaseConfig)

// Firebase storage reference
export const auth = getAuth(app)
export const storage = getStorage(app)

export default storage
