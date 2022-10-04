const button = document.getElementById("button")

button.addEventListener("click", function(event){
    event.preventDefault();
    apiURL = "http://localhost/register"

    const data = {
        "usuario" : document.getElementById("emailInput").value(),
        "password" : document.getElementById("passwordInput").value()
    }

    const response = await fetch(apiURL, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        mode: "cors",
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Solicitud fallida', err));
}, false);