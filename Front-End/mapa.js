const checkAuth = async ()=> {
    fetch("http://localhost:3001/check-user", {
        credentials: "include"
    }).then((resp)=> {
        if(resp.status == 403)
            document.getElementById("Sesion").style.display = "none"
            document.getElementById("Slide").style.display = "none"
          
        return resp.json()
        
    }).then((data)=>{
        document.getElementById("Changing-Account").innerText = data.email
        document.getElementById("Slide").style.display = ""
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
