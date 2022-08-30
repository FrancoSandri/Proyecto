 <?php
include_once("./mysql_functions.php");

//Información atraves del metodo Post
$EmailUsu = $_POST["mail"];
$ContraseniaUsu = $_POST["contrasenias"];
$ContrseniaConfirm = $_POST ["confirmar"];

//Query para llamar a los ususarios ya ingresados
$query = "SELECT NombreUsuario FROM InicioSesion WHERE NombreUsuario = ?";
$result = DB::getInstance()->query($query,array($_POST["mail"]) );

if($result->count() != 0){
    echo "Ya existe un usuario con ese mail, inicie sesion";
    //Con esto me fijo si es que el usuario ya existe en la db
}

else if($_POST["contrasenias"] == $_POST ["confirmar"]){
    
    $query2 = "INSERT INTO InicioSesion(NombreUsuario, Contrasenia) VALUES ('$EmailUsu','$ContraseniaUsu')";
    $result2 = DB::getInstance()->query($query2,array($_POST["mail"],array($_POST["contrasenias"])));
    //aca veo que la info puesta en el POST de contraseña y en el de confirmar, y si son iguales como deberia de ser se ejecuta la funcion query2
    // inserta a la base de datos los valores del mail y la contrseña haciendo asi que ya queden dentro de la base de datos
}

else{
    echo "Confirme su contrseña!!";
    //aca si no sucede nada de lo anterior quiere decir que no se confirmo su contraseña o que esta distinta a la otra
}
?>