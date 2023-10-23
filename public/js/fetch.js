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
const db = firebase.database();

document.getElementById("fetch").addEventListener('click', function() {
    const username = document.getElementById("username").value;

    
    const userRef = db.ref(`user/${username}`);

    userRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
           
            const userData = snapshot.val();
            const userInfoDiv = document.getElementById("userInfo");
            userInfoDiv.innerHTML = "<h3>User Information:</h3>";

            for (const key in userData) {
                if (userData.hasOwnProperty(key)) {
                    userInfoDiv.innerHTML += `<p>${key}: ${userData[key]}</p>`;
                }
            }

            
            fetchAndDisplayItems(username, userInfoDiv);
        } else {
           
            document.getElementById("userInfo").innerHTML = "User not found";
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
});

function fetchAndDisplayItems(username, userInfoDiv) {
    
    const itemsRef = db.ref(`user_items/${username}`);

 
    itemsRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
          
            const itemsData = snapshot.val();
            userInfoDiv.innerHTML += "<h3>User Info:</h3>";

            for (const key in itemsData) {
                if (itemsData.hasOwnProperty(key)) {
                    const item = itemsData[key];
                    userInfoDiv.innerHTML += `
                        <p>Item Name: ${item.name}</p>
                        <p>Item Description: ${item.description}</p>
                    `;
                }
            }
        } else {
            userInfoDiv.innerHTML += "User has no items.";
        }
    }).catch((error) => {
        console.error("Error fetching items:", error);
    });
}