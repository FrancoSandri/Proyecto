function darkmode(){
var icon = document.getElementById("darkmode-toggle");

    icon.onclick = function()
        {
            document.body.classList.toggle("dark-theme");
            if(document.body.classList.contains("dark-theme"))
            {
                icon.className = "bi bi-brightness-high";
            }
            else
            {
                icon.className = "bi bi-moon";
            }
        }
    }