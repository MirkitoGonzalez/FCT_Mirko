<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Category;

class PruebasController extends Controller
{
    public function index() {
        $titulo = 'animales';
        $animales = ['Perro','Gato','Tigre'];
            return view('pruebas.index', array(
                'titulo' => $titulo,
                'animales' => $animales
            ));
    }
    
    public function testORM(){
         /*$posts = Post::all();
//        var_dump($posts);
        echo '</br>';
        foreach ($posts as $post) {
           /* echo "<h1>" . ($post->title) . "</h1>";
            echo "<span style='color:gray;'>Rol: {$post->user->name}</span>";
            echo "<span>- Logueado con: {$post->user->email}</span>";
            echo "<br><span style='color:red;'>Categoría: {$post->category->name}</span>";
            echo "<h2>" . ($post->content) . "</h2>";
            echo "<hr>"; 
        } */
        
        $categories = Category::all();
         foreach ($categories as $category) {
             echo "<h1 style='color:blue;'>Categoría: $category->name</h1>";
             
        foreach ($category->posts as $post) {
            echo "<h1>" . ($post->title) . "</h1>";
            echo "<span style='color:gray;'>Rol: {$post->user->name}</span>";
            echo "<br><span style='color:red;'>Categoría: {$post->category->name}</span>";
            echo "<h2>" . ($post->content) . "</h2>";
        }
        echo "<hr>";
         }
        
        die();
    }
}