const logOut = document.getElementById('logOut');
const registeracc = document.getElementById('registeracc');
const showaccount = document.getElementById('showaccount');
const displayNameHolder = document.getElementById('displayNameHolder');
const userName = document.getElementById("userName");
const mail=document.getElementById("mail");
const userEmail = document.getElementById("userEmail");
const auth = firebase.auth();

logOut.addEventListener('click', () => {

    auth.signOut()
    .then(() => {
        window.location.assign('../');
    })
    .catch(error => {
        console.error(error);
    })
})

auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        const email = user.email;
        if (email) {
            userEmail.textContent = email; // Update the userEmail element with the user's email
        }
    } else {
     
        userEmail.textContent = ''; 
    }
});

showaccount.addEventListener('click', () => {
    window.location.assign('./fetch.html');
});

registeracc.addEventListener('click', () => {
    window.location.assign('./registration.html');
});
