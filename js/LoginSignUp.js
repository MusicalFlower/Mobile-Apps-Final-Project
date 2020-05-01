document.addEventListener("DOMContentLoaded", function(){
    //Event handler for buttons
    document.getElementById('create_account').onclick = sign_up;
    document.getElementById('login').onclick = log_in;
});

var sign_up = function() {

var cont = true;
var cont2 = true;

let workspace = document.getElementById("inform");
workspace.innerHTML = ""; 
    
//Getting username and password input
let in_user = document.getElementById("in_user").value;
let in_pass = document.getElementById("in_pass").value;
    
//Checking if valid credentials entered, informing user if not
    
if (in_user === "" && in_pass === ""){
    //Need to enter a username and a password!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a username and password");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
    cont2 = false;
}
else if (in_user === ""){
    //Need to enter a username!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a username");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
    cont2 = false;
}
else if (in_pass === ""){
    //Need to enter a password!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a password");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
    cont2 = false;
}
    
//Checking if username exists - cannot have multiple same usernames

let accounts = [];
if (cont == true){
    //See if local storage data needs to be initialized
    if (localStorage.getItem("accounts")){
        console.log("Accounts exist");
        //Get user accounts to search through usernames
        accounts = JSON.parse(window.localStorage.getItem("accounts"));
        i = 0;
        while (i < accounts.length){
            //Check if username exists
            if (accounts[i].username == in_user){
                //Inform user that the username input already exists
                let herror = document.createElement('h3');
                let text = document.createTextNode("Username already exists");
                herror.appendChild(text);
                workspace.append(herror);
                cont2 = false;
            }
            i = i+1;
        }
        
    }
    else{
        console.log("New login will initialize accounts");
    }
}
    
    
if (cont2 == true) { //If there are no input errors
    
    //Save username and password by appending to local storage
    //Not a real database, just creating simulation
    len = accounts.length;
    accounts[len] = {
        username: in_user,
        password: in_pass,
    }
    
    //Store the username
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    //Set the active account to refer to in other pages
    window.localStorage.setItem("active_account", len);
    
    //Go to the movie search page
    window.location.href = "search_page.html";
}
}




var log_in = function() {
    
var cont = true;
var cont2 = false;
    
let workspace = document.getElementById("inform");
workspace.innerHTML = "";    
    
//Getting username and password input
let in_user = document.getElementById("in_user").value;
let in_pass = document.getElementById("in_pass").value;
    
//Checking if valid credentials entered, informing user if not
    
if (in_user === "" && in_pass === ""){
    //Need to enter a username and a password!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a username and password");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
}
else if (in_user === ""){
    //Need to enter a username!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a username");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
}
else if (in_pass === ""){
    //Need to enter a password!
    let herror = document.createElement('h3');
    let text = document.createTextNode("Enter a password");
    herror.appendChild(text);
    workspace.append(herror);
    cont = false;
}
    
//Checking if username is found
let accounts = [];
let found = false;
let ind = 0;
if (cont == true){
    //See if local storage data needs to be initialized
    if (localStorage.getItem("accounts")){
        console.log("Accounts exist");
        //Get user accounts to search through usernames
        accounts = JSON.parse(window.localStorage.getItem("accounts"));
        i = 0;
        while (i < accounts.length){
            //Check if username exists
            if (accounts[i].username == in_user){
                //Found username
                found = true;
                ind = i;
            }
            i = i+1;
        }
        
    }
    else{
        let herror = document.createElement('h3');
        let text = document.createTextNode("Username or password not found");
        herror.appendChild(text);
        workspace.append(herror);
    }
}
if (found == true){
    //See if the password matches password input
    if(accounts[ind].password == in_pass)
        {
            //Password matches!
            cont2 = true;
        }
    else{
        let herror = document.createElement('h3');
        let text = document.createTextNode("Username or password not found");
        herror.appendChild(text);
        workspace.append(herror);
    }
}
else{
    let herror = document.createElement('h3');
    let text = document.createTextNode("Username or password not found");
    herror.appendChild(text);
    workspace.append(herror);
}
    
if (cont2 == true) { //If there are no input errors (username and password found)
    //Save username and password by appending to local storage
    //Not a real database, just creating simulation
    len = accounts.length;
    accounts[len] = {
        username: in_user,
        password: in_pass,
    }
    
    //Store the username
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    //Set the active account to refer to in other pages
    window.localStorage.setItem("active_account", len);
    
    //Go to the movie search page
    window.location.href = "search_page.html";
}   
}