const checkAuth = async ()=> {
    fetch("http://localhost:3001/check-user", {
        credentials: "include"
    }).then((resp)=> {
        if(resp.status == 403)
            document.getElementById("Sesion").style.display = "none"
            console.log("SOS GAYYY")
        return resp.json()
        
    }).then((data)=>{
        document.getElementById("bienvenidoUser").innerText = "Bienvenid@ a  Satolution " + data.email
        document.getElementById("Changing-Account").innerText = data.email
        console.log(data)
        if (data.email == data.email){
            Login.style.display = "none"
            Register.style.display = "none"
        }
    })

    
}
checkAuth()
const SessionToggle = ()=> {
    fetch("http://localhost:3001/logout", {
        credentials: "include",
        method: "POST"
    })
    window.location.reload()
}
checkAuth()

// const campos = async ()=> {
//     const res = await fetch("http://localhost:3001/registro-plantas", {
//         method: "POST",
//         body: JSON.stringify({
//             NombreCampo: "asdf",
//             NombreCultivo: "aasdf", 
//             Cordenadas: [34, 12], 
//             CantidadAgua: 12
//         }),
//         credentials: "include",
//     })
//     let data = await res.json()
//     console.log(data)
// }
// campos()