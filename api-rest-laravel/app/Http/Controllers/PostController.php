<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Post;
use App\Category;
use App\User;
use App\Helpers\JwtAuth;

class PostController extends Controller {

    public function __construct() {
        $this->middleware('api.auth', ['except' =>
            ['index', 'store', 'upload', 'show', 'getImage', 'getPostByUser', 'getPostByCategory']]);
    }

    // listar todos getposts
    public function index() {
        $posts = Post::all()->load('category');

        return response()->json([
                    'code' => 200,
                    'status' => 'success',
                    'posts' => $posts
                        ], 200);
    }

    // detalles proximamente
    public function show($id) {
        $post = Post::find($id)->load('category')->load('user');

        if (is_object($post)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'posts' => $post
            ];
        } else {
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'La entrada no existe'
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request) {
        // Recoger datos por post
        $json = $request->input('json', null);
        $params = json_decode($json); // sacamos objeto
        $params_array = json_decode($json, true); // sacamos array (para eso es el true)
        // Conseguir usuario identificado
        if (!empty($params_array)) {
            $jwtAuth = new JwtAuth();
            $token = $request->header('Authorization', null);
            $user = $jwtAuth->checkToken($token, true);

            // Validar los datos que llegan
            $validate = \Validator::make($params_array, [
                        'title' => 'required',
                        'content' => 'required',
                        'category_id' => 'required',
                        'image' => 'required',
            ]);

            if ($validate->fails()) {
                $data = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => 'No se guardó el post, faltan datos'
                ];
            } else {
                // Guardar el articulo / Entrada
                $post = new Post();
                $post->user_id = $user->sub;
                $post->category_id = $params->category_id;
                $post->title = $params->title;
                $post->content = str_replace('</p>','',str_replace('<p>','',$params->content));
                // Quitamos el <p> </p> de la entrada a la BBDD
                $post->image = $params->image;
                $post->save();

                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'post' => $post
                ];
            }
        } else {
            $data = [
                'code' => 400,
                'status' => 'error',
                'message' => 'Envíe los datos correctamente.'
            ];
        }

        // Devolver la respuesta
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request) {
        // Recoger datos por post
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        // Devolver datos/entrada
        $data = array(
            'status' => 'error',
            'code' => 400,
            'message' => 'Datos incorrectos enviados'
        );

        if (!empty($params_array)) {

            // Validar los datos que llegan
            $validate = \Validator::make($params_array, [
                        'title' => 'required',
                        'content' => 'required',
                        'category_id' => 'required', /* si existe deja actualizar si no error de validacion */
            ]);

            if ($validate->fails()) {
                // Algo ha fallado
                $data['errors'] = $validate->errors();
                return response()->json($data, $data['code']);
            }

            // Quitamos o evitamos actualizar algo
            unset($params_array['id']);
            unset($params_array['user_id']);
            unset($params_array['created_at']);
            unset($params_array['user']);

            $jwtAuth = new JwtAuth();
            $token = $request->header('Authorization', null);
            $user = $jwtAuth->checkToken($token, true);

            // buscar post en concreto
            $post = Post::where('id', $id)
                    ->where('user_id', $user->sub)
                    ->first();

            if (!empty($post) && is_object($post)) {
                //actualizar registro en concreto
                $post->update($params_array);
                // devolver data
                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'post' => $post,
                    'changes' => $params_array
                );
            }
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request) {
        // un post sólo lo borrará un usuario propietario :)
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);

        // Obtener Post
        //$post = Post::find($id);
        $post = Post::where('id', $id)
                        ->where('user_id', $user->sub)->first();
        //si estas identificado y eres dueño de ese post

        if (!empty($post)) {

            // Borrarlo :)
            $post->delete();
            // Devolver resultado
            $data = [
                'status' => 'success',
                'code' => 200,
                'post' => $post
            ];
        } else {
            $data = [
                'status' => 'error',
                'code' => 404,
                'message' => 'No existe la entrada que intentas borrar!!'
            ];
        }
        return response()->json($data, $data['code']);
    }

    private function getIdentity() { // v44
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);
        return $user;
    }

    public function upload(Request $request) {
        // Recogeremos imagen de nuestra peticion
        $image = $request->file('file0');
        // Validarla
        $validate = \Validator::make($request->all(), [
                    'file0' => 'required|image|mimes:jpg,jpeg,bmp,png,gif',
        ]);
        // Guardarla
        if (!$image || $validate->fails()) {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'Error subiendo la imagen!!'
            ];
        } else {
            $image_name = str_replace(".", "", str_replace($image
                                            ->getClientOriginalExtension(), '', $image
                                            ->getClientOriginalName())) . '_' . time() . '.' . $image
                            ->getClientOriginalExtension();

            \Storage::disk('images')->put($image_name, \File::get($image));

            // Devolver resultados
            $data = [
                'status' => 'success',
                'code' => 200,
                'image' => $image_name
            ];
        }
        //devolver los datoss
        return response()->json($data, $data['code']);
    }

    public function getImage($filename) {
        // Comprobar si existe la imagen a recibir
        $isset = \Storage::disk('images')->exists($filename);

        if ($isset) {
            // Conseguir la imagen
            $file = \Storage::disk('images')->get($filename);
            // Devolver la imagen
            return new Response($file, 200);
        } else {
            // Mostrar error si algo va mal
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'No existe la imagen.'
            ];
        }
        return response()->json($data, $data['code']);
    }

    // Todos los post/entradas de una categoría
    public function getPostByCategory($id) {
        $posts = Post::where('category_id', $id)->get();
        return response()->json(['status' => 'success', 'posts' => $posts], 200);
    }

    // Todos los post/entradas de un usuario
    public function getPostByUser($id) {
        $posts = Post::where('user_id', $id)->get();
        return response()->json(['status' => 'success', 'posts' => $posts], 200);
    }

}