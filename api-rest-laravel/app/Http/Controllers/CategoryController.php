<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Category;
use App\User;
use App\Helpers\JwtAuth;

class CategoryController extends Controller {

    public function __construct() {
        $this->middleware('api.auth', ['except' => [ 'index', 'show']]);
    }

    public function index() /* MOSTRAR CATEGORIAS    */ {
        $categories = Category::all();

        return response()->json([
                    'status' => 'success',
                    'code' => 200,
                    'categories' => $categories
        ]);
    }

    public function show($id) {
        $category = Category::find($id);

        if (is_object($category)) {
            $data = [
                'status' => 'success',
                'code' => 200,
                'category' => $category
            ];
        } else {
            $data = [
                'status' => 'error',
                'code' => 404,
                'message' => 'La categoria no existe'
            ];
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request) {
        // Recoger los datos por post
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if (!empty($params_array)) {

            // Validar los datos
            $validate = \Validator::make($params_array, [
                        'name' => 'required'
            ]);
            // Guardar Categorias
            if ($validate->fails()) {

                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'La categoria no se ha guardado'
                ];
            } else {
                $category = new Category();
                $category->name = $params_array['name'];
                $category->save();

                $data = [
                    'status' => 'success',
                    'code' => 200,
                    'category' => $category
                ];
            }
        }else{
            $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'No has llegado a enviar la categoría'
                ];
        }
        // Devolver resultado
        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request){
        // Recoger datos por post
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        
        if(!empty($params_array)){
        // Validar datos
        $validate = \Validator::make($params_array, [
           'name' => 'required' 
        ]);
        // Quitamos o evitamos actualizar algo
            unset($params_array['id']);
        unset($params_array['created_at']);
        
        // Actualizar registro
        $category = Category::where('id', $id)->update($params_array);
        $data = [
                    'status' => 'success',
                    'code' => 200,
                    'category' => $params_array
                ];
        }else{
            $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'No has llegado a enviar la categoría'
                ];
        }
        // Devolver respuesta
        return response()->json($data, $data['code']);
    }
    
}
