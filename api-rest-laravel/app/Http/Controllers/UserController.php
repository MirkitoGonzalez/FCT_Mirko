<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User; /* Imprescindible para que podamos hacer new user etc... */

class UserController extends Controller {

    public function pruebas(Request $request) {
        return "Accion de pruebas de USER-CONTROLLER";
    }

    public function register(Request $request) {
        /* $name = $request->input('name');
          $surname = $request->input('surname');
          return "Accion de registro de usuarios"; */

        // Recoger los datos del usuario por POST
        $json = $request->input('json', null);
        $params = json_decode($json); // sacamos objeto
        $params_array = json_decode($json, true); // sacamos array (para eso es el true)

        if (!empty($params_array) && !empty($params_array)) {
//Limpiar Datos (clean)
            $params_array = array_map('trim', $params_array);
            //
            //
        // Validar los datos
            $validate = \Validator::make($params_array, [
                        'name' => 'required|alpha',
                        'surname' => 'required|alpha',
                        'email' => 'required|email|unique:users', /* si existe deja registrar si no error de validacion */
                        'password' => 'required'
            ]);

            if ($validate->fails()) {
                // Algo ha fallado
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se creó correctamente',
                    'errors' => $validate->errors()
                );
            } else {
                // Validación pasada correctamente :)
                // Cifrar contraseña
                $pwd = password_hash($params->password, PASSWORD_BCRYPT, ['cost' => 5]); // 5 es las veces que se va a encriptar
                // Comprobar si el usuario existe o no
                // en la validacion hacemos que sea UNIQUE
                // Crear el usario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->password = $pwd;
                $user->role = 'ROLE_USER';
                // Guardar el usuario
                $user->save();
                // el array de lo que ha pasado
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se creó correctamente',
                    'user' => $user
                );
            }
        } else {
            $data = array(
                'status' => 'error',
                'code' => 409,
                'message' => 'Los datos no se mandaron correctamente',
            );
        }
        return response()->json($data, $data['code']);
    }

    public function login(Request $request) {

        $jwtAuth = new \JwtAuth();
        // Recibimos los datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        // Validar los datos
        $validate = \Validator::make($params_array, [
                    'email' => 'required|email', /* si existe deja registrar si no error de validacion */
                    'password' => 'required'
        ]);

        if ($validate->fails()) {
            // Algo ha fallado
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se logueó correctamente',
                'errors' => $validate->errors()
            );
        } else {
            // Cifraremos la Pass
            $pwd = hash('sha256', $params->password);
            // Devolver token o Datos
           $signup = $jwtAuth->signup($params->email, $pwd);
           if (!empty($params->getToken)){
               $signup = $jwtAuth->signup($params->email, $pwd, true);
           }
        }



        return response()->json($signup, 200);
    }

}
