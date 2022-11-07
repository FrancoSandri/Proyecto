const checkAuth = async ()=> {
    fetch("http://localhost:3001/check-user", {
        credentials: "include"
    }).then((resp)=> {
        if(resp.status == 403)
            document.getElementById("Sesion").style.display = "none"
            console.log("SOS GAYYY")
        return resp.json()
        
    }).then((data)=>{
        document.getElementById("Changing-Account").innerText = data.email
        if (data.email == data.email){
            Login.style.display = "none"
            Register.style.display = "none"
        }
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

// API

var mymap = L.map('mapid').fitWorld();


L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(mymap);
// L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Y6whCApnCOJzE1LhKnGj', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//     maxZoom: 20,

//     tileSize: 512,
//     zoomOffset: -1,
  // search
L.Control.geocoder().addTo(mymap);