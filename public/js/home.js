const mailContainer = document.querySelector('.mail-container');
const shownMailContainer = 'container mail-container shown-container';
const hiddenMailContainer = 'container mail-container hidden-container';
const socialMediaContainer = document.querySelector('.socialMedia-container');
const shownSocialMediaContainer = 'container socialMedia-container shown-container';
const hiddenSocialMediaContainer = 'container socialMedia-container hidden-container';
const phoneContainer = document.querySelector('.phone-container');
const shownPhoneContainer = 'container phone-container shown-container';
const hiddenPhoneContainer = 'container phone-container hidden-container';
const authenticationMethod1 = document.getElementById('method1');
const authenticationMethod2 = document.getElementById('method2');
const authenticationMethod3 = document.getElementById('method3');
const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const labels = document.getElementsByTagName('label');
const signInWithMail = document.getElementById('signInWithMail');
const signInWithPhone = document.getElementById('signInWithPhone');
const signUp = document.getElementById('signUp');
const failureModal = document.querySelector('.failure');
const signInWithGoogleButton = document.getElementById('signInWithGoogle');
const signInWithTwitterButton = document.getElementById('signInWithTwitter');

const auth = firebase.auth();

const signInWithTwitter = () => {
  const TwitterProvider = new firebase.auth.TwitterAuthProvider();

  auth.signInWithPopup(TwitterProvider)
  .then(() => {
    window.location.assign('./profile');
  })
  .catch(error => {
    console.error(error);
  })
}

signInWithTwitterButton.addEventListener('click', signInWithTwitter);

const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(googleProvider)
  .then(() => {
    window.location.assign('./profile.html');
  })
  .catch(error => {
    console.error(error);
  })
}

signInWithGoogleButton.addEventListener('click', signInWithGoogle);

//Sign in function
const signInWithEmailFunction = () => {
  const email = mailField.value;
  const password = passwordField.value;

  //Built in firebase function responsible for authentication
  auth.signInWithEmailAndPassword(email, password)
  .then(() => {
 
    window.location.assign('./profile.html')
  })
  .catch(error => {
   
    console.error(error);
  })
}


signInWithMail.addEventListener('click', signInWithEmailFunction);



const initializeInputAnimationState = (fieldName, labelNumber) => {
  if(fieldName.value)
    labels.item(labelNumber).className = 'initial-focused-field'
  else
    labels.item(labelNumber).className = 'initial-unfocused-field'
}

authenticationMethod1.addEventListener('change', () => {
  mailContainer.className = shownMailContainer
  socialMediaContainer.className = hiddenPhoneContainer
  phoneContainer.className = hiddenSocialMediaContainer
  initializeInputAnimationState(mailField, 0);
  initializeInputAnimationState(passwordField, 1);
});

authenticationMethod2.addEventListener('change', () => {
  mailContainer.className = hiddenMailContainer
  socialMediaContainer.className = shownSocialMediaContainer
  phoneContainer.className = hiddenSocialMediaContainer
});



mailField.addEventListener('focus', () => {
  if(!mailField.value)
  labels.item(0).className = "focused-field"
});

passwordField.addEventListener('focus', () => {
  if(!passwordField.value)
  labels.item(1).className = "focused-field"
});

mailField.addEventListener('blur', () => {
  if(!mailField.value)
    labels.item(0).className = "unfocused-field"
});

passwordField.addEventListener('blur', () => {
  if(!passwordField.value)
    labels.item(1).className = "unfocused-field"
});

