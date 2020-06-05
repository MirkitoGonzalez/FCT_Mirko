<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Helpers\JwtAuth;
use App\User;
/* Imprescindible para que podamos hacer new user etc... */

class UserController extends Controller {

    public function __construct(){
        $this->middleware('api.auth',
        ['except' =>['index', 'upload', 'login', 'detail',
         'getImage', 'register', 'avatarUpload']]);
    }

    public function register( Request $request ) {
        /* $name = $request->input( 'name' );
        $surname = $request->input( 'surname' );
        return 'Accion de registro de usuarios';
        */

        // Recoger los datos del usuario por POST
        $json = $request->input( 'json', null );
        $params = json_decode( $json );
        // sacamos objeto
        $params_array = json_decode( $json, true );
        // sacamos array ( para eso es el true )

        if ( !empty( $params_array ) && !empty( $params_array ) ) {
            //Limpiar Datos ( clean )
            $params_array = array_map( 'trim', $params_array );

            // Validar los datos
            $validate = \Validator::make( $params_array, [
                'name' => 'required',
                'surname' => 'required',
                'email' => 'required|email|unique:users', /* si existe deja registrar si no error de validacion */
                'password' => 'required'
            ] );

            if ( $validate->fails() ) {
                // Algo ha fallado
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El usuario no se creó correctamente',
                    'errors' => $validate->errors()
                );
            } else {
                // Validación pasada correctamente : )
                // Cifrar contraseña
                // $pwd = password_hash( $params->password, PASSWORD_BCRYPT, ['cost' => 4] );
                // 4 es las veces que se va a encriptar
                $pwd = hash( 'sha256', ( $params->password ) );
                /* Metodo para que todo use la misma encriptación ♥ */
                // Comprobar si el usuario existe o no
                // en la validacion hacemos que sea UNIQUE
                // Crear el usario
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->password = $pwd;
                $user->role = 'ROLE_USER';
                /* por defecto imagen */
                $user->image = 'default.png';
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
        return response()->json( $data, $data['code'] );
    }

    public function login( Request $request ) {

        $jwtAuth = new \JwtAuth();
        // Recibimos los datos por POST
        $json = $request->input( 'json', null );
        $params = json_decode( $json );
        $params_array = json_decode( $json, true );
        // Validar los datos
        $validate = \Validator::make( $params_array, [
            'email' => 'required|email', /* si existe deja registrar si no error de validacion */
            'password' => 'required' // hash a 256
        ] );

        if ( $validate->fails() ) {
            // Algo ha fallado
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se logueó correctamente',
                'errors' => $validate->errors()
            );
        } else {
            // Cifraremos la Pass
            $pwd = hash( 'sha256', $params->password );
            // Devolver token o Datos
            $signup = $jwtAuth->signup( $params->email, $pwd );
            if ( !empty( $params->getToken ) ) {
                $signup = $jwtAuth->signup( $params->email, $pwd, true );
            }
        }
        return response()->json( $signup, 200 );
    }

    /* Para actualizar datos del usuarios desde la cabecera PETICIÓN */

    public function update( Request $request ) {
        //comprobar si esta identificado
        $token = $request->header( 'Authorization' );
        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken( $token );

        // recoger por post los datos
        $json = $request->input( 'json', null );
        $params_array = json_decode( $json, true );
        

        if ( $checkToken && !empty( $params_array ) ) {

            // Sacar datos del user identificado
            $user = $jwtAuth->checkToken( $token, true );

            // validar datos
            $validate = \Validator::make( $params_array, [
                'name' => 'required',
                'surname' => 'required',
                'email' => 'required|email|unique:users,' . $user->sub
            ] );
            // quitar campos que no quiera actualizar
            unset( $params_array['id'] );
            unset( $params_array['role'] );
            $params_array['password'] = hash( 'sha256', $params_array['password'] );
            //$params_array['image'] = $image_name;
            unset( $params_array['created_at'] );
            unset( $params_array['remember_token'] );
            // actualizar usuario en BBDD
            $user_update = User::where( 'id', $user->sub )->update( $params_array );
            // devolver array con resultado
            $data = array(
                'status' => 'success',
                'code' => 200,
                'user' => $user,
                'changes' => $params_array
            );
        } else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'El usuario no está identificado.'
            );
        }
        return response()->json( $data, $data['code'] );
    }

    // Subir Avatar/foto

    public function upload( Request $request ) {

        // Recoger datos de la petición
        $image = $request->file( 'file0' );

        // Validar imagen
        $validate = \Validator::make( $request->all(), [
            'file0' => 'required|image|mimes:jpg,svg,jpeg,png,bmp,gif'
        ] );

        // subir avatar/imagen //// guardar
        if ( !$image || $validate->fails() ) {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'El avatar no se ha subido correctamente. Upload'
            );
        } else {
            //$image_name=time().$image->getClientOriginalName();
            $image_name = str_replace( '.', '', str_replace( $image->getClientOriginalExtension(), '',
            $image->getClientOriginalName() ) ) . '_' . time() . '.' . $image->getClientOriginalExtension();
            \Storage::disk( 'users' )->put( $image_name, \File::get( $image ) );

            $data = array(
                'code' => '200',
                'status' => 'success',
                'image' => $image_name
            );
        }
        return response()->json( $data, $data['code'] )->header('Content-Type', 'text/plain');
    }

    // para obtener el avatar de nuestro usuario

    public function getImage( $filename ) {

        $isset = \Storage::disk( 'users' )->exists( $filename );

        if ( $isset ) {

            $file = \Storage::disk( 'users' )->get( $filename );
            return new Response( $file, 200 );
        } else {
            $data = array(
                'code' => '404',
                'status' => 'error',
                'message' => 'La imagen no existe.'
            );

            return response()->json( $data, $data['code'] );
        }
    }

    // obtener detalles

    public function detail( $id ) {
        $user = User::find( $id );

        if ( is_object( $user ) ) {
            $data = array(
                'code' => '200',
                'status' => 'success',
                'user' => $user
            );
        } else {
            $data = array(
                'code' => '404',
                'status' => 'error',
                'message' => 'El usuario no existe en la BBDD'
            );
        }
        return response()->json( $data, $data['code'] );
    }
}
