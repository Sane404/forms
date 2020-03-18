window.addEventListener("load",searchStorage);
let output = document.querySelector(".name");
let hello = document.querySelector(".hello")
let logout = document.querySelector(".logout");
function searchStorage(){
    let array = JSON.parse(localStorage.getItem("FormData"));
    let obj = array.find(x => x.loggedIn === true);
    output.innerHTML = obj.nickname;
}
