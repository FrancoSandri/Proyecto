<!doctype html>
<html lang="es">

<head>
    <meta lang="es" />
    <meta charset="utf-8" />
    <title>Satolution</title>
    <link href="Style/HomeStyle.css" rel="stylesheet" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="fonts.css">
    <script src='main.js'></script>
    
</head>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<header x-data="{ open: false }" class="header">
    <div class="header__logo">
    </div>
    <button class="header__button-nav--open" x-on:click="open = true">Menu</button>
    <nav class="nav" x-bind:class="open ? 'nav--show' : ''">
        <div class="nav__button" x-on:click="open = false">
            <button class="header__button-nav--close">Cerrar</button>
        </div>
            <ul class="nav__ul">
            <li class="nav__item"><a href="#" class="nav__link">Mapa</a></li>
            <li class="nav__item"><a href="Us.html" class="nav__link">Nosotros</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Contacto</a></li>
            <li class="nav__item"><a href="Login.html" class="nav__link">Iniciar Sesión</a></li>
            <li class="nav__item"><a href="Register.html" class="nav__link">Registrarse</a></li>
        </ul>
    </nav>
</header>
<body>
    <div class="Contenedor">
        <div class="BackGround">
                <h1> Satolution </h1>
                <h3> Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, iste harum in </h3>
                <form action="Home.php">
                <button >Explora</button>
                </form>
        </div>
    <div class="Slider">
    <div class="Slider-Titles">
                    <h1> Que es la sequia? </h1>
                    <h4> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus incidunt excepturi laborum facilis? </h4>
        </div>
        <div class="slider-frame">
            <ul>
                <li><img src="Fotos/Example1.jpg" alt=""></li>
                <li><img src="Fotos/Example1.jpg" alt=""></li>
                <li><img src="Fotos/Example1.jpg" alt=""></li>
                <li><img src="Fotos/Example1.jpg" alt=""></li>
            </ul>
        </div>
    </div>
        <div class="Imagenes">
            <div class="titles-container">
                <h1 class="Titles">Satolution</h1>
                <h4 class="Titles">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed ex ipsam animi,
                    mollitia
                    magni iusto sapiente nemo suscipit?</h4>
            </div>
            <div class="images">
                <img src="Fotos/Ejemplo.jpg">
                <img src="Fotos/Ejemplo.jpg">
                <div class="Ima">
                    <img src="Fotos/Ejemplo.jpg">
                    <img src="Fotos/Ejemplo.jpg">
                </div>
            </div>
        </div>
        <div class="Legal">
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fuga explicabo, quibusdam temporibus assumenda quia pariatur nostrum ducimus natus doloremque consequatur. Excepturi quod cumque ratione recusandae sed eligendi. Explicabo, eius! </h3>
        </div>
    </div>

<body>
        