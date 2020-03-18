//Main Buttons
let registerButton = document.querySelector(".registerButton");
let loginButton = document.querySelector(".loginButton");
//RegisterForm
let registerForm = document.querySelector(".registerForm");
let loginForm = document.querySelector(".loginForm");
let nickInput = document.getElementById("nick");
let emailInput = document.getElementById("email");
let passInput = document.getElementById("password");
let emailError = document.querySelector(".eRror");
let lengthError = document.querySelector(".nLength");
let passError1 = document.querySelector(".passRegError");
let passError2 = document.querySelector(".passLengthError");
let submit = document.querySelector(".submit");
let cancelR = document.querySelector(".cancelRegister");
//LoginForm
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginCheck = document.querySelector(".loginCheck");
let cancelL = document.querySelector(".cancelLogin");
//localStorageArray
let formDataArray = [];
//Patterns
let onlyNumbersPattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let passPattern = /^(?=.*[A-Z])(?=.*\d).+$/;
//Events
window.addEventListener("load",storageCheck);
//RegisterFormEvents
nickInput.addEventListener("keyup",NickInputValidity);
emailInput.addEventListener("keyup",EmailValidity);
passInput.addEventListener("keyup",PassValidity);
submit.addEventListener("click",submitCheck);
registerButton.addEventListener("click",showRegisterForm);
//LoginFormEvents
loginButton.addEventListener("click",showLoginForm);
loginCheck.addEventListener("click",checkData);
function NickInputValidity(e){
    let length = e.target.value.length;
    if(length < 3){
        lengthError.style.display = "block";
        nickInput.classList.remove("valid");
        nickInput.classList.add("invalid");
    }
    else if(length >=3){
        lengthError.style.display = "none";
        nickInput.classList.remove("invalid");
        nickInput.classList.add("valid");
    }
}
function EmailValidity(e){
    let value = e.target.value;
    if(!onlyNumbersPattern.test(value)){
        emailError.style.display = "block";
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
    }
    else{
        emailError.style.display = "none";
        emailInput.classList.remove("invalid");
        emailInput.classList.add("valid");
    }
}
function PassValidity(e){
    let length = e.target.value.length;
    let value = e.target.value;
    // if(length > 12){
    //     passError2.style.display = "block";
    // }
    // else if(length <= 12){
    //     passError2.style.display = "none";
    // }
    if(passPattern.test(value) && length <= 12){
        passError1.style.display = "none";
        passError2.style.display = "none";
        passInput.classList.remove("invalid");
        passInput.classList.add("valid");
    }
    else if(length > 12){
        passError2.style.display = "block";
        passInput.classList.remove("valid");
        passInput.classList.add("invalid");
    }
    else if(!passPattern.test(value)){
        passError1.style.display = "block";
        passInput.classList.remove("valid");
        passInput.classList.add("invalid");
    }
}
function submitCheck(e){
    if(!nickInput.classList.contains("valid")||!emailInput.classList.contains("valid")||!passInput.classList.contains("valid")){
        e.preventDefault();
        alert("fill the form");
    }
    else{
        let formData = {nickname:nickInput.value,email:emailInput.value,password:passInput.value,loggedIn:false};
        formDataArray.push(formData);
        localStorage.setItem("FormData",JSON.stringify(formDataArray));
        ShowButtons();
    }
}
function storageCheck(){
    if(localStorage.getItem("FormData")){
        formDataArray = JSON.parse(localStorage.getItem("FormData"));
        for(i=0;i<formDataArray.length;i++){
            formDataArray[i].loggedIn = false;
        }
        localStorage.setItem("FormData",JSON.stringify(formDataArray));
        console.log(formDataArray);
    }
}
function showLoginForm(){
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    HideButtons();
}
function showRegisterForm(){
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    HideButtons();
}
function checkData(e){
    
    formDataArray = JSON.parse(localStorage.getItem("FormData"));
    let obj = formDataArray.find(x => x.email === loginEmail.value && x.password === loginPassword.value);
    
    if(obj === undefined){
        e.preventDefault();
    }
    else{
        obj.loggedIn = true;
        localStorage.setItem("FormData",JSON.stringify(formDataArray));
    }
}
function HideButtons(){
    loginButton.style.display = "none";
    registerButton.style.display = "none";
}
function ShowButtons(){
    loginButton.style.display = "block";
    registerButton.style.display = "block";
}
cancelL.addEventListener("click",function(){
    ShowButtons();
    loginForm.style.display = "none";
});
cancelR.addEventListener("click",function(){
    ShowButtons();
    registerForm.style.display = "none";
});
