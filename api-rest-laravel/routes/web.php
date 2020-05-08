<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// RUTAS DE PRUEBA

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
Route::get('/test-orm', 'PruebasController@testOrm');

// RUTAS DE LA API DE VERDAD - LA BUENA
// 
// Comunes: GET POST PUT DELETE.
// 
    //pero estas son para entender como va todo

   // Route::get('usuario/pruebas', 'UserController@pruebas');
   // Route::get('categoria/pruebas', 'CategoryController@pruebas');
  //  Route::get('entrada/pruebas', 'PostController@pruebas');
    
    // las que valen ;)
    
    Route::post('api/register', 'UserController@register');
    Route::post('api/login', 'UserController@login');