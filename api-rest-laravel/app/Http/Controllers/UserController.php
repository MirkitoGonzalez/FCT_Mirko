<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "Accion de pruebas de USER-CONTROLLER";
    }
    
    public function register(Request $request){
        return "Accion de registro de usuarios";
    }
    
    public function login(Request $request){
        return "Accion de logueo del usuario";
    }
}
