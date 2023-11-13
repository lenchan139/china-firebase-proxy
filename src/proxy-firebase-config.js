const caw = require("caw");
const https = require("https");
const admin = require("firebase-admin");
const serviceAccount = require(`../config/service-account-key.json`);

console.log("begin testing proxy Firebase");

// Your Proxy
const firebaseAgent = caw("http://127.0.0.1:8118", {
  protocol: "https"
});

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount, firebaseAgent),
  databaseURL: "https://china-proxy-1c2da.firebaseio.com",
  agent: firebaseAgent, // proxy agent
  logging_enabled: true // open logging info
});

// Use the shorthand notation to retrieve the default app's services
var defaultAuth = app.auth();
var defaultDatabase = app.database();
var db = admin.firestore();

var myTestRef = db.collection('my-test-collection').doc('my-test-document');
var getDoc = myTestRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

console.log(`Firebase App Name: ${app.name}`);

console.log(`Default database: ${JSON.stringify(Object.keys(defaultDatabase))}`);

console.log("end of the testing proxy Firebase");


