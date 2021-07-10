import {Injectable} from "@nestjs/common";
import admin from "firebase-admin";
const serviceAccount = require('../../../viact-test-firebase-adminsdk-jgqpf-f03e8206d6.json');


import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable()
export class FirebaseProvider {
    admin:admin.app.App;
    app:firebase.app.App;

    constructor() {
        this.admin = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        const firebaseConfig = {
            apiKey: "AIzaSyCxhfx5B1xXY6bptSICVGLhHHCri0jih-s",
            authDomain: "viact-test.firebaseapp.com",
            projectId: "viact-test",
            storageBucket: "viact-test.appspot.com",
            messagingSenderId: "28109995369",
            appId: "1:28109995369:web:95b9b70ce0637df35011f8",
            measurementId: "G-3EBZZ1WK14"
        };
        this.app = firebase.initializeApp(firebaseConfig);
    }

}