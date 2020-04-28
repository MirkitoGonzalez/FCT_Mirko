<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return '<h1>Hola Mundo con Laravel</h1>';
});

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/pruebas/{nombre?}', function ($nombre = null) {
    $texto = 'Texto desde una ruta con nombre →';
    $texto .= ' ' . $nombre;
   return view('pruebas', array(
        'texto' => $texto
    ));
});

Route::get('/animales', 'PruebasController@index');