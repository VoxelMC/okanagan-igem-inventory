import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCuFoByRhTh6dClgNRiUWQFINWtEOl-ScI",
  authDomain: "okanagan-igem-inventory.firebaseapp.com",
  databaseURL: "https://okanagan-igem-inventory-default-rtdb.firebaseio.com",
  projectId: "okanagan-igem-inventory",
  storageBucket: "okanagan-igem-inventory.appspot.com",
  messagingSenderId: "44547188890",
  appId: "1:44547188890:web:19ab78be42abf193641723",
  measurementId: "G-D69404GD9C"
};

export const app = initializeApp(firebaseConfig);
const test = "test";