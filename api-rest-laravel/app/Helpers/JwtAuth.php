<?php

namespace App\Helpers;

use \Firebase\JWT\JWT;
use Iluminate\Support\Facades\DB;
use App\User;

class JwtAuth{

    public $key;

    public function __construct() {
        $this->key = 'mi_clave_secreta_600268719';
    }

    public function signup($email, $password, $getToken = null) {

        // Buscamos si exite el user con sus credenciales
        $user = User::where([
                    'email' => $email,
                    'password' => $password
                ])->first();
        // comprobar si son correctas o no ( y devuelve un objeto)
        $signup = false;
        if (is_object($user)) {
            $signup = true;
        }
        // Generar el token con los datos requeridos (del user identificado)
        if ($signup) {
            $token = array(
                'sub' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'surname' => $user->surname,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60 * 2)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256'); /* Indicamos tambien el algoritmo de cifrado */
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
            // devolver los datos decodificados o el token en función de un parametro.
            // mas metdos mas adelante.

            if (is_null($getToken)) {
                $data = $jwt;
            } else {
                $data = $decoded;
            }
        } else {
            $data = array(
                'status' => 'error',
                'message' => 'Login Incorrecto.'
            );
        }


        return $data;
    }

}
