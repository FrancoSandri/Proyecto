const button = document.getElementById("button")
const form1 = document.getElementById("form1")
let coords = localStorage.getItem("coords")
const submithandler = (e) =>{
    e.preventDefault()
}
form1.addEventListener("submit", submithandler)
button.addEventListener("click", event => {
    coords = localStorage.getItem("coords")
    event.preventDefault();
    console.log("click")
    let apiURL = "http://localhost:3001/registro-plantas"

    const data = {
        "NombreCampo" : document.getElementById("NombreCampoInput").value,
        "NombreCultivo" : document.getElementById("NombreCultivoInput").value,
        "CantidadAgua" : document.getElementById("CantidadAguaInput").value,
        "Cordenadas": coords
    }

    console.log(data)

    fetch(apiURL, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        mode: "cors",
        credentials:'include',
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Solicitud fallida', err));
});

