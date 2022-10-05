const button = document.getElementById("button")

button.addEventListener("click", function(event){
    event.preventDefault();
    apiURL = "http://localhost:3000/name-reset/:id"

    const data = {
        "usuario" : document.getElementById("emailInput").value()
    }

    const response = fetch(apiURL, {
        method: "put",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        mode: "cors",
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Solicitud fallida', err));
}, false);