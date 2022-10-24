const button = document.getElementById("button")
const inputerr = document.getElementById("passwordInput");
button.addEventListener("click", function(event){
    event.preventDefault();
    apiURL = "http://localhost:3000/login"

    const data = {
        "usuario" : document.getElementById("emailInput").value(),
        "password" : document.getElementById("passwordInput").value()
    }

    const response = fetch(apiURL, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => toggleMenu.classList.toggle('err'));
}, false);