import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const functions = firebase.functions();
const database = firebase.database();
const storage = firebase.storage();

export {
    firebase,
    auth,
    functions,
    database,
    storage,
};
