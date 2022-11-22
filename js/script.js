console.log("Script found");
console.log("Checking if Users are saved locally");
if (!localStorage.getItem("users")) {
    console.log("Result: Not found, creating")
    fetch("js/users.json")
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("users", JSON.stringify(data));
            console.log("Data saved to localStorage", data);
        })
} else {
    console.log("Result: Found");
    console.log("localStorage", JSON.parse(localStorage.getItem("users")));
}



let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let loginBtn = document.getElementById("loginBtn");
let resultsDiv = document.getElementById("resultsDiv");



loginBtn.addEventListener("click", () => {
    currentUsername = usernameInput.value;
    currentPassword = passwordInput.value;
    //fetch
    let userlist = JSON.parse(localStorage.getItem("users"));

    //search usernames for a match
    let usernameFound = false;
    let userID = -1;
    for(let i = 0; i < userlist.length; i++){
        if(userlist[i]['username'] == currentUsername){
            console.log(currentUsername + " found in userlist");
            usernameFound = true;
            userID = userlist[i]["id"];
            break;
        }
        console.log(i,usernameFound);
    }
    if (usernameFound && currentPassword == userlist[userID]['password']){
        console.log("Username and password matching");
    }else{
        console.log("Username or password does not match");
    }
})

