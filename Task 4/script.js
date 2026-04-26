const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password_confirm = document
    .getElementById("password_confirm")
    .value.trim();
  const date = document.getElementById("date").value;

  let isValid = true;

  // name validation
  if (name === "") {
    document.getElementById("name-error").textContent = "Name is required";
    isValid = false;
  }

  // email validation
  if(email === ""){
        document.getElementById("email-error").textContent = "Email is required"
        isValid = false
    } else if(!email.includes("@") || !email.includes(".")){
        document.getElementById("email-error").textContent = "Invalid email format"
        isValid = false
    }

    // password validation
    if(password === ""){
        document.getElementById("password-error").textContent = "Password is required"
        isValid = false
    } else if(password.length < 8){
        document.getElementById("password-error").textContent = "Min 8 characters"
        isValid = false
    }

    // confirm password
    if(password_confirm === ""){
        document.getElementById("confirm-error").textContent = "Please confirm your password"
        isValid = false
    } else if(password !== password_confirm){
        document.getElementById("confirm-error").textContent = "Passwords don't match"
        isValid = false
    }
     if(date === ""){
        document.getElementById("date-error").textContent = "Date of birth is required"
        isValid = false
    }

    // success
    if(isValid){
        document.getElementById("success-msg").textContent = "Form submitted successfully ✅"
    }
});
