const button = document.getElementById("button")
const form = document.getElementById("form")
// const newPassword = document.getElementById("newPasswordInput")
// const email = document.getElementById("emailInput")
const submithandler = (e) =>{
    e.preventDefault();
}
form.addEventListener("submit", submithandler)
button.addEventListener("click", async (event)=>{
    event.preventDefault();
    apiURL = "http://localhost:3001/password-reset"
    
    const data = {
        "email": document.getElementById("emailInput").value,
        "password": document.getElementById("newPasswordInput").value
    }
     await fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        mode: "cors",
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(response=>console.log(response.json()))
    .catch(error=>console.log(error))
}, false);
