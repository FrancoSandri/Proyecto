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
    apiURL = "http://localhost:3001/logout"

    const response = await fetch(apiURL, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
    })
    const respData = await response.json();
    console.log(respData)
}, false);