const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const db = admin.firestore();
const db = getFirestore();

const taskCollection = db.collection("tasks");
const batch = db.batch();
const taskRef = db.collection("tasks");

console.log(1);
(async () => {
    
})();
console.log(3);
