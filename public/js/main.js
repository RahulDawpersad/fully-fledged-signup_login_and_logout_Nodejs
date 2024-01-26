var emailInput = document.getElementById("email-input");
var emailError = document.getElementById("email-error");
var passInput = document.getElementById("password-input");
var passError = document.getElementById("password-error");
var confirmPassInput = document.getElementById("confirm-password-input");
var confirmPassError = document.getElementById("confirm-password-error");
var btnSubmit = document.getElementById("btn-signup");

emailInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
passInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
// confirmPassInput.addEventListener("input", function () {
//   this.value = this.value.replace(/\s/g, "");
// });

// Input Functionality
emailInput.addEventListener("input", validateEmail);
passInput.addEventListener("input", validatePassword);
confirmPassInput.addEventListener("input", validateConfirmPassword);

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

// function validatePassword() {
//   let password = passInput.value;
//   let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s\t]{8,}$/;

//   if (password === '') {
//     showError(passError, "Password Field Must Not Be Empty");
//     confirmPassInput.disabled = true; // Disable confirm password field
//   } else if (!password.match(passwordPattern)) {
//     showError(passError, "Invalid Password!");
//     confirmPassInput.disabled = true; // Disable confirm password field
//   } else {
//     showSuccess(passError, "Valid Password");
//     confirmPassInput.disabled = false; // Enable confirm password field
//     if (confirmPassInput.value !== '') {
//       validateConfirmPassword();
//     }
//   }
// }

// function validateConfirmPassword() {
//   let password = passInput.value;
//   let confirmPassword = confirmPassInput.value;

//   if (confirmPassword === '') {
//     showError(confirmPassError, "Password Field Must Not Be Empty");
//   } else if (password !== confirmPassword) {
//     showError(confirmPassError, "Passwords do not match!");
//   } else {
//     showSuccess(confirmPassError, "Passwords match");
//   }
//   updateSignUpButtonState();
// }
function validatePassword() {
  let password = passInput.value;
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (password === "") {
    showError(passError, "Do not leave password field blank!");
    confirmPassInput.disabled = true; // Disable confirm password field
  } else if (!password.match(passwordPattern)) {
    showError(passError, "Invalid Password!");
    confirmPassInput.disabled = true; // Disable confirm password field
  } else {
    showSuccess(passError, "Valid Password");
    confirmPassInput.disabled = false; // Enable confirm password field
    if (confirmPassInput.value !== "") {
      validateConfirmPassword();
    }
  }
}

function validateConfirmPassword() {
  let password = passInput.value;
  let confirmPassword = confirmPassInput.value;

  if (confirmPassword === "") {
    showError(confirmPassError, "Do not leave password field empty");
  } else if (password !== confirmPassword) {
    showError(confirmPassError, "Passwords do not match!");
  } else {
    showSuccess(confirmPassError, "Passwords match");
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
  var passwordToggle = document.querySelector(".password-toggle");
  if (passInput.type === "password") {
    passInput.type = "text";
    passwordToggle.style.backgroundImage = "url('../img/hide.svg')";
  } else {
    passInput.type = "password";
    passwordToggle.style.backgroundImage = "url('../img/eye.svg')";
  }
}

// Confirm Password hide/show functionality
function toggleConfirmPasswordVisibility() {
  var passwordConfirmtoggle = document.querySelector(".passwordConfirmtoggle");
  if (confirmPassInput.type === "password") {
    confirmPassInput.type = "text";
    passwordConfirmtoggle.style.backgroundImage = "url('../img/hide.svg')";
  } else {
    confirmPassInput.type = "password";
    passwordConfirmtoggle.style.backgroundImage = "url('../img/eye.svg')";
  }
}

// PASSWORD STRENGTH CHECK
function checkPasswordStrength() {
  let passwordStrengthInput = passInput.value;
  var strengthIndicator = document.getElementById("strength");
  var ruleLength = document.getElementById("rule-length");
  var ruleUppercase = document.getElementById("rule-uppercase");
  var ruleLowercase = document.getElementById("rule-lowercase");
  var ruleNumber = document.getElementById("rule-number");
  var ruleSpecial = document.getElementById("rule-special");
  var ruleList = document.getElementById("password-rules");

  // Show rules when the user starts typing
  if (passwordStrengthInput.length > 0) {
    ruleList.style.display = "block";
    strengthIndicator.style.display = "block";
  } else {
    ruleList.style.display = "none";
    strengthIndicator.style.display = "none";
  }

  // Check passwordStrengthInput strength
  var strength = 0;
  if (passwordStrengthInput.length >= 8) strength += 20;
  if (/[A-Z]/.test(passwordStrengthInput)) strength += 20;
  if (/[a-z]/.test(passwordStrengthInput)) strength += 20;
  if (/[0-9]/.test(passwordStrengthInput)) strength += 20;
  if (/[^A-Za-z0-9\s]/.test(passwordStrengthInput)) strength += 20; // Exclude spaces

  strengthIndicator.value = strength;

  // Check passwordStrengthInput rules
  ruleLength.innerHTML =
    passwordStrengthInput.length >= 8
      ? "✅ At least 8 characters"
      : "❌ At least 8 characters";
  ruleUppercase.innerHTML = /[A-Z]/.test(passwordStrengthInput)
    ? "✅ At least one uppercase letter"
    : "❌ At least one uppercase letter";
  ruleLowercase.innerHTML = /[a-z]/.test(passwordStrengthInput)
    ? "✅ At least one lowercase letter"
    : "❌ At least one lowercase letter";
  ruleNumber.innerHTML = /[0-9]/.test(passwordStrengthInput)
    ? "✅ At least one number"
    : "❌ At least one number";
  ruleSpecial.innerHTML = /[^A-Za-z0-9\s]/.test(passwordStrengthInput)
    ? "✅ At least one special character"
    : "❌ At least one special character";
}

function updateSignUpButtonState() {
  btnSubmit.disabled = !(
    emailError.classList.contains("valid") &&
    passError.classList.contains("valid") &&
    confirmPassError.classList.contains("valid")
  );
  // Check if all fields are valid and button is enabled
  if (
    emailError.classList.contains("valid") &&
    passError.classList.contains("valid") &&
    confirmPassError.classList.contains("valid") &&
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
  }, 3500);