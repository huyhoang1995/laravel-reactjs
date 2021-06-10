<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeCtrl extends Controller
{
    public function redirectDefaultPage(){
        if (Auth::check()) {
            return redirect()->route('user');
        }
        else{
            return redirect()->route('login');
            ;
        }
    }
}
