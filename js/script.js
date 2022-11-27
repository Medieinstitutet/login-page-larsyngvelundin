console.log("Script found");

console.log("Creating all variables");
let logOutBtn = document.getElementById("logOutBtn");
let startRegisterBtn = document.getElementById("startRegisterBtn");
let registerFormBtn = document.getElementById("registerFormBtn");
let headerParagraph = document.getElementById("header-welcome");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let usernameInputReg = document.getElementById("usernameInputReg");
let passwordInputReg = document.getElementById("passwordInputReg");
let loginBtn = document.getElementById("loginBtn");
let loginMsg = document.getElementById("loginMsg");
let registerMsg = document.getElementById("registerMsg");
let registerOverlay = document.getElementById("registerOverlay");
let loginFloater = document.getElementById("loginFloater");
let membersOnlyContent = document.getElementById("membersOnlyContent");
let membersOnlyText = `<p>"<b>Members Only</b>" is the eighth episode in the twentieth season of the American animated
television series <i>South Park</i>. The 275th episode of the series overall, it first aired on
Comedy Central in the United States on November 16, 2016.</p>`
console.log("Variables successfully created");


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


//Update header first time
updateHTML();


logOutBtn.addEventListener("click", () => {
    console.log("User clicked 'Log out'");
    localStorage.setItem("loginSession", "null");
    updateHTML();
});

startRegisterBtn.addEventListener("click", () => {
    console.log("User clicked 'Register'");
    registerOverlay.classList.toggle("hide");
    if (startRegisterBtn.innerHTML == "Register"){
        startRegisterBtn.innerHTML = "Login";
    }
    else{
        startRegisterBtn.innerHTML = "Register";
    }
    updateHTML();
});

registerFormBtn.addEventListener("click", () => {
    console.log("User clicked 'Register' in registration form");
    newUsername = usernameInputReg.value;
    newPassword = passwordInputReg.value;
    if (newUsername.length > 0 && newUsername != 'null') {
        if (isPasswordValid(newPassword)) {
            addUser(newUsername, newPassword);
            updateHTML();
            loginMsg.innerHTML = "Successfully registered user '" + newUsername + "'";
            usernameInputReg.value = "";
            passwordInputReg.value = "";
            registerOverlay.classList.toggle("hide");
        }
        else {
            registerMsg.innerHTML = "Please type a valid password<br>";
            registerMsg.innerHTML += "At least 10 characters<br>";
        }
    }
    else {
        registerMsg.innerHTML = "Please type a valid username";
    }
});

function isPasswordValid(password) {
    //basic password checker for now
    if (password.length > 10) {
        return true;
    }
    else {
        return false;
    }
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
        updateHTML();

        passwordInput.value = "";
        usernameInput.value = "";
    } else {
        console.log("Username or password does not match");
        loginMsg.innerHTML = "Username or password does not match";
    }
});

function updateHTML() {
    loggedInUser = localStorage.getItem("loginSession");
    if (loggedInUser == 'null') {
        console.log("Logged in user is 'null'");
        headerParagraph.innerHTML = "Welcome, please login or register";
        startRegisterBtn.classList.remove('hide');
        loginFloater.classList.remove('hide');
        logOutBtn.classList.add('hide');
        membersOnlyContent.classList.add('hide');
        membersOnlyContent.innerHTML = "";
    } else {
        console.log("Logged in user is'" + loggedInUser + "'");
        headerParagraph.innerHTML = "Welcome, " + loggedInUser;
        startRegisterBtn.classList.add('hide');
        loginFloater.classList.add('hide');
        logOutBtn.classList.remove('hide');
        membersOnlyContent.classList.remove('hide');
        loginMsg.innerHTML = "";
        membersOnlyContent.innerHTML = `<p>Hello ${loggedInUser},</p> ${membersOnlyText}`;
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