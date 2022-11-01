const button = document.getElementById("button")
const form = document.getElementById("form")
const form1 = document.getElementById("form1")
const submithandler = (e) =>{
    e.preventDefault();
}
form.addEventListener("submit", submithandler)
form1.addEventListener("submit", submithandler)
button.addEventListener("click", function(event){
    event.preventDefault();
    apiURL = "http://localhost:3001/register"

    const data = {
        "email" : document.getElementById("emailInput").value,
        "password" : document.getElementById("passwordInput").value
    }

    const response = fetch(apiURL, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        mode: "cors",
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Solicitud fallida', err));
}, false);