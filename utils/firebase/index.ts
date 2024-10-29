import * as admin from 'firebase-admin';

const serviceAccounts = {
    project1: require('../../config/firebase/serviceAccountProject1.json'),
    project2: require('../../config/firebase/serviceAccountProject2.json'),
    // เพิ่ม service account อื่น ๆ ตามต้องการ
};

const apps = {
    project1: admin.initializeApp({
        credential: admin.credential.cert(serviceAccounts.project1),
        databaseURL: "https://<PROJECT1-ID>.firebaseio.com",
        storageBucket: "<PROJECT1-ID>.appspot.com"
    }, 'project1'),

    project2: admin.initializeApp({
        credential: admin.credential.cert(serviceAccounts.project2),
        databaseURL: "https://<PROJECT2-ID>.firebaseio.com",
        storageBucket: "<PROJECT2-ID>.appspot.com"
    }, 'project2'),

};

export const getFirebaseApp = (projectName: string): admin.app.App => {
    return apps[projectName];
};