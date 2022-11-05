const button = document.getElementById("button")
const form = document.getElementById("form")
const form1 = document.getElementById("form1")
const submithandler = (e) =>{
    e.preventDefault()
}
form.addEventListener("submit", submithandler)
form1.addEventListener("submit", submithandler)
button.addEventListener("click", function(event){
    event.preventDefault();
    apiURL = "http://localhost:3001/registro-plantas"

    const data = {
        "NombreCampo" : document.getElementById("NombreCampoInput").value,
        "NombreCultivo" : document.getElementById("NombreCultivoInput").value,
        "CantidadAgua" : document.getElementById("CantidadAguaInput").value,
        "Cordenadas" : document.getElementById("CordenadasInput").value
    }

    const response = fetch(apiURL, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        mode: "cors",
        credentials:'include',
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Solicitud fallida', err));
}, false);