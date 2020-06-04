<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
 */

// Clases
use App\Http\Middleware\ApiAuthMiddleware;

// RUTAS DE PRUEBA

Route::get('/', function () {
    return '<h1>Hola Mundo con Laravel</h1>';
});

Route::get('/welcome', function () {
    return view('welcome');
});

//Route::get('/pruebas/{nombre?}', function ($nombre = null) {
//    $texto = 'Texto desde una ruta con nombre →';
//    $texto .= ' ' . $nombre;
//    return view('pruebas', array(
//        'texto' => $texto
//    ));
//});

/*Route::get('/animales', 'PruebasController@index');
Route::get('/test-orm', 'PruebasController@testOrm');*/

// RUTAS DE LA API DE VERDAD - LA BUENA
// 
// Comunes: GET POST PUT DELETE.
// 
// pero estas son para entender como va todo
// Route::get('usuario/pruebas', 'UserController@pruebas');
// Route::get('categoria/pruebas', 'CategoryController@pruebas');
// Route::get('entrada/pruebas', 'PostController@pruebas');
// las que valen ;)

// Rutas del Controlador de Usuarios

Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');
Route::put('/api/user/update', 'UserController@update'); /*Header Autorization y el Token*/
Route::post('/api/user/upload', 'UserController@upload'); /*->middleware(ApiAuthMiddleware::class);*/
Route::get('/api/user/image/{filename}', 'UserController@getImage');
// Route::get('/api/user/avatar/{filename}', 'UserController@getImage'); //anterior
Route::get('/api/user/detail/{id}', 'UserController@detail');

// Rutas del Controlador de Categorías
Route::resource('/api/category','CategoryController');

// Rutas del Controlador de Categorías/Post´s
Route::resource('/api/post','PostController');
Route::post('/api/post/upload', 'PostController@upload');
Route::get('api/post/image/{filename}', 'PostController@getImage');
Route::get('api/post/category/{id}', 'PostController@getPostByCategory');
Route::get('api/post/user/{id}', 'PostController@getPostByUser');