const algo = async () => {
    const res = await fetch("http://localhost:3001/get-all")
    const data = await res.json()
    console.log(data)
}
algo()
const button = document.getElementById("button")
const inputerr = document.getElementById("passwordInput");
const form = document.getElementById("form")
const submithandler = (e) =>{
    e.preventDefault();
}
form.addEventListener("submit", submithandler)
button.addEventListener("click", async (event)=>{
    event.preventDefault();
    apiURL = "http://localhost:3001/login"

    const data = {
        "email" : document.getElementById("emailInput").value,
        "password" : document.getElementById("passwordInput").value
    }
    console.log(data);
    const response = await fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Credentials": true
        },
        credentials:'include',
        body: JSON.stringify(data)
    })
    const respData = await response.json();
    console.log(respData)
}, false);
