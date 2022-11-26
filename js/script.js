console.log("Script found");
console.log("Checking if Users are saved in LS");
if (!localStorage.getItem("users")) {
    console.log("Result: Not found, creating");
    fetch("js/users.json")
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("users", JSON.stringify(data));
            console.log("Users saved to localStorage", data);
        })
} else {
    console.log("Result: Found");
    console.log("localStorage", JSON.parse(localStorage.getItem("users")));
}

let logOutBtn = document.getElementById("logOutBtn");
let startRegisterBtn = document.getElementById("startRegisterBtn");
let registerFormBtn = document.getElementById("registerFormBtn");


console.log("Checking for Login Session in LS");
if (!localStorage.getItem("loginSession")) {
    console.log("Result: Not found, creating");
    localStorage.setItem("loginSession", 'null');
    console.log("LoginSession saved to localStorage", localStorage.getItem("loginSession"));
    logOutBtn.classList.add("hide");
} else {
    console.log("Result: Found");
    console.log("localStorage", localStorage.getItem("loginSession"));
    startRegisterBtn.classList.add("hide");
}

let headerParagraph = document.getElementById("header-welcome");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let usernameInputReg = document.getElementById("usernameInputReg");
let passwordInputReg = document.getElementById("passwordInputReg");
let loginBtn = document.getElementById("loginBtn");
let loginMsg = document.getElementById("loginMsg");
let registerMsg = document.getElementById("registerMsg");
let registerOverlay = document.getElementById("registerOverlay");

//Set Header
updateHeader();


logOutBtn.addEventListener("click", () => {
    console.log("User clicked 'Log out'");
    localStorage.setItem("loginSession", "null");
    updateHeader();
});

startRegisterBtn.addEventListener("click", () => {
    console.log("User clicked 'Register'");
    registerOverlay.classList.toggle("hide");
    updateHeader();
});

registerFormBtn.addEventListener("click", () => {
    console.log("User clicked 'Register' in registration form");
    newUsername = usernameInputReg.value;
    newPassword = passwordInputReg.value;
    if (newUsername.length > 0) {
        if (isPasswordValid(newPassword)) {
            addUser(newUsername, newPassword);
            updateHeader();
            loginMsg.innerHTML = "Successfully registered user '" + usernameInputReg.value + "'";
            usernameInputReg.value = "";
            passwordInputReg.value = "";
            registerOverlay.classList.toggle("hide");
        }
        else {
            registerMsg.innerHTML = "Please type a valid password<br>";
            registerMsg.innerHTML += "At least 10 characters";
        }
    }
    else {
        registerMsg.innerHTML = "Please type a username";
    }
});

function isPasswordValid(password){
    return false;
}

loginBtn.addEventListener("click", () => {
    currentUsername = usernameInput.value;
    currentPassword = passwordInput.value;
    //fetch
    let userlist = JSON.parse(localStorage.getItem("users"));

    //search usernames for a match
    let usernameFound = false;
    let userID = -1;
    for (let i = 0; i < userlist.length; i++) {
        if (userlist[i]['username'] == currentUsername) {
            console.log(currentUsername + " found in userlist");
            usernameFound = true;
            userID = i;
            break;
        }
        console.log(i, usernameFound);
    }
    if (usernameFound && currentPassword == userlist[userID]['password']) {
        console.log("Username and password matching");
        localStorage.setItem("loginSession", userlist[userID]['username']);
        updateHeader();

        passwordInput.value = "";
        usernameInput.value = "";
    } else {
        console.log("Username or password does not match");
        loginMsg.innerHTML = "Username or password does not match";
    }
});

function updateHeader() {
    loggedInUser = localStorage.getItem("loginSession");
    if (loggedInUser == 'null') {
        console.log("Logged in user is 'null'");
        headerParagraph.innerHTML = "Welcome, please login or register";
        startRegisterBtn.classList.remove('hide');
        logOutBtn.classList.add('hide');
    } else {
        console.log("Logged in user is'" + loggedInUser + "'");
        headerParagraph.innerHTML = "Welcome, " + loggedInUser;
        startRegisterBtn.classList.add('hide');
        logOutBtn.classList.remove('hide');
        loginMsg.innerHTML = "";
    }
}

function addUser(username, password) {
    //fetch
    let userList = JSON.parse(localStorage.getItem("users"));

    //change
    let newUser = {
        'username': username,
        'password': password
    };
    userList.push(newUser);

    //upload
    localStorage.setItem('users', JSON.stringify(userList));
    console.log("User added", username);
    console.log("localStorage", JSON.parse(localStorage.getItem("users")));
}