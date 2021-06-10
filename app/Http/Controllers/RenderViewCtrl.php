<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RenderViewCtrl extends Controller
{
    public function login(){
        $data = [
            'title' => 'Đăng nhập hệ thống'
        ];
        return view('login', $data);
    }

    public function user(){
        $data = [
            'title' => 'Quản lý người dùng'
        ];
        return view('index', $data);
    }

    public function userInfo(){
        $data = [
            'title' => 'Thông tin cá nhân người dùng'
        ];
        return view('index', $data);
    }
}
