<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function pruebas(Request $request){
        return "Accion de pruebas de USER-CONTROLLER";
    }
    
    public function register(Request $request){
        /*$name = $request->input('name');
        $surname = $request->input('surname');
        return "Accion de registro de usuarios";*/
        
        $data = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'El usuario no se creó correctamente'
        );
        
        return response()->json($data,$data['code']);
        
    }
    
    public function login(Request $request){
        return "Accion de login de usuarios";
    }
}
