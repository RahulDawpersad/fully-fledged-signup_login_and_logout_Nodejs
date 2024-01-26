var emailInput = document.getElementById("email-input");
var emailError = document.getElementById("email-error");
var passInput = document.getElementById("password-input");
var passError = document.getElementById("password-error");
var btnSubmit = document.getElementById("btn-signup");

// Input Functionality
emailInput.addEventListener("input", validateEmail);
passInput.addEventListener("input", validatePassword);

function validateEmail() {
  let email = emailInput.value;
  let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!email.match(emailPattern)) {
    showError(emailError, "Invalid Email Address!");
  } else {
    showSuccess(emailError, "Valid Email Address");
  }
  updateSignUpButtonState();
}


function validatePassword() {
  let password = passInput.value;
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

  if (password === '') {
    showError(passError, "Password Field Must Not Be Empty");
  } else if (!password.match(passwordPattern)) {
    showError(passError, "Invalid Password!");
  } else {
    showSuccess(passError, "Valid Password");
  }
  updateSignUpButtonState();
}

function showError(element, message) {
  element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  element.classList.remove("valid");
  element.classList.add("error");
}

function showSuccess(element, message) {
  element.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
  element.classList.remove("error");
  element.classList.add("valid");
}

// Password hide/show functionality
function togglePasswordVisibility() {
  var passwordToggle = document.querySelector('.password-toggle');
  if (passInput.type === 'password') {
    passInput.type = 'text';
    passwordToggle.style.backgroundImage = "url('../img/hide.svg')";
  } else {
    passInput.type = 'password';
    passwordToggle.style.backgroundImage = "url('../img/eye.svg')";
  }
}

function updateSignUpButtonState() {
  btnSubmit.disabled = !(
    emailError.classList.contains("valid") &&
    passError.classList.contains("valid") 
)
   // Check if all fields are valid and button is enabled
   if (
    emailError.classList.contains("valid") &&
    passError.classList.contains("valid") &&
    !btnSubmit.disabled
  ) {
    // Change the background color of the button
    btnSubmit.style.backgroundColor = "blue"; // Change to desired color
  } else {
    // Revert to default background color when button is disabled
    btnSubmit.style.backgroundColor = ""; // Revert to default color
  }
}


  // Preloader Functionality
  setTimeout(function(){
    $('.wrapper').fadeOut();
  }, 2800);

// Form Resubmission
document.getElementById('loginForm').addEventListener('DOMContentLoaded', function(){
  e.preventDefault();
})
