const checkAuth = async ()=> {
    fetch("http://localhost:3001/check-user", {
        credentials: "include"
    }).then((resp)=> {
        if(resp.status == 403)
        console.log("SOS GAYYY")
        return resp.json()
    }).then((data)=>{
        document.getElementById("bienvenidoUser").innerText = "Bienvenid@ a  Satolution " + data.email
    })

    
}
const SessionToggle = ()=> {
    fetch("http://localhost:3001/logout", {
        credentials: "include",
        method: "POST"
    })
    window.location.reload()
}
checkAuth()