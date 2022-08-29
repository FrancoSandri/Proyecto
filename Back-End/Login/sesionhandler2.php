  <?php

include_once("./mysql_functions.php");

//traigo la info en forma de POST y la transformo en una variable para que sea mas manejable
$EmailUsu = $_POST["mail"];


$query = "SELECT Contrasenia FROM InicioSesion WHERE NombreUsuario = ?";
$result = DB::getInstance()->query($query,array($_POST["mail"]));



  

  if($result->count() != 0){
    foreach($result->results() as $row){
      $ContraseniaUsu = $row->Contrasenia;
  } 
    
   if($ContraseniaUsu == $_POST["contrasenia"]){
    echo"se ha logeado con exito";}

    else {
      echo"Hay un error en los datos ingresados";
    }
   
  }
 









?>