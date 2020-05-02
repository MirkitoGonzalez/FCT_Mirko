<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
            
    // Relacion de uno a muchos inversa (muchos post pertenecen a una categoria y a un usuario)
            
    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }        
    
    public function category() {
        return $this->belongsTo('App\Category', 'category_id');   
    }
}
