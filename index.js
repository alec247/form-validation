const btn = document.querySelector("#submit");
const form = document.querySelector("form");
const email = document.querySelector("#email");
const country = document.querySelector("country");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");

btn.onclick = event => {
    // if all fields are valid, unhide form submitted div
    if (
        email.validity.valid &&
        zip.validity.valid &&
        password.validity.valid &&
        confirmPassword.validity.valid
    ) {
        document.querySelector("#success").classList.toggle("hidden");
    }

    event.preventDefault();
};

const validateEmail = event => {
    const target = event.target;
    const errorDiv = document.querySelector("#email-error");
    const emailRegExp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

    if (!emailRegExp.test(target.value)) {
        email.setCustomValidity("Please enter a valid email address");
    } else {
        email.setCustomValidity("");
    }
    errorDiv.textContent = email.validationMessage;

    // TODO: email validation using email RegEx
};

const validateZip = event => {
    const target = event.target;
    const parsedValue = parseInt(target.value);
    const errorDiv = document.querySelector("#zip-error");

    if (!parsedValue) {
        // give error to enter a number
        zip.setCustomValidity("Please enter a number");
    } else if (target.value.length != 5) {
        // give error to change size
        zip.setCustomValidity("Zip code must be 5 digits");
    } else {
        zip.setCustomValidity("");
    }
    errorDiv.textContent = zip.validationMessage;
};

const validatePassword = event => {
    const target = event.target;
    const errorDiv = document.querySelector("#password-error");
    const passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // TODO: password validation using RegEx
    if (!passwordRegExp.test(target.value)) {
        password.setCustomValidity("Please enter a valid password");
    } else {
        password.setCustomValidity("");
    }
    errorDiv.textContent = password.validationMessage;
};

const validateConfirm = event => {
    const target = event.target;
    const errorDiv = document.querySelector("#confirm-error");

    // just checks confirm field vs password field (not secure ofc)
    if (event.target.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
    } else {
        confirmPassword.setCustomValidity("");
    }
    errorDiv.textContent = confirmPassword.validationMessage;
};

// adds all listeners for validity at once
const addValidationListeners = () => {
    email.addEventListener("focusout", validateEmail);
    zip.addEventListener("focusout", validateZip);
    password.addEventListener("focusout", validatePassword);
    confirmPassword.addEventListener("focusout", validateConfirm);
};

addValidationListeners();
