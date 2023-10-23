// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB6wkx-rcLMhlQAhOGJIHGAbH6B8HyNClM",
    authDomain: "webapproj.firebaseapp.com",
    databaseURL: "https://webapproj-default-rtdb.firebaseio.com",
    projectId: "webapproj",
    storageBucket: "webapproj.appspot.com",
    messagingSenderId: "250272386567",
    appId: "1:250272386567:web:7a8a9e4c1eb19a4d83e4a2"
  };
  
          firebase.initializeApp(firebaseConfig);
          const database = firebase.database();
  
          const matchForm = document.getElementById('match-form');
          const usernameInput = document.getElementById('username');
          const matchFieldInput = document.getElementById('matchField');
          const matchValueInput = document.getElementById('matchValue');
  
          matchForm.addEventListener('submit', function (e) {
              e.preventDefault();
              const username = usernameInput.value;
              const matchField = matchFieldInput.value;
              const matchValue = matchValueInput.value; 
              const userRef = database.ref(`user/${username}`);
              userRef.once('value', (snapshot) => {
                  if (snapshot.exists()) {
                    
                      const userData = snapshot.val();
                      userData[matchField] = matchValue;
                      userRef.set(userData); 
                  } else {
                      alert(`User ${username} does not exist.`);
                  }
              });
              matchForm.reset();
          });
         