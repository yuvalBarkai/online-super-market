import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRFzPjGcpRVn1SfLIFTq36MRaUpOvrTL0",
  authDomain: "project-demos-c75c5.firebaseapp.com",
  projectId: "project-demos-c75c5",
  storageBucket: "project-demos-c75c5.appspot.com",
  messagingSenderId: "584455654520",
  appId: "1:584455654520:web:c656d7b9d6adbf61bb718d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
