<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\UserModel;
use App\Libs\Config\ListType\UserType;
use Validator, Auth;

class LoginCtrl extends Controller
{
    use AuthenticatesUsers;


    function __construct(){
        $this->redirectTo = '/';
    }
    /**
     * Thuc hien login
     *
     * @param Request $request
     * @param UserModel $userModel
     * @return void
     */
    public function doLogin(Request $request, UserModel $userModel){
        //validate 
        $rules = [
    		'account' =>'required',
    		'password' => 'required'
    	];
    	$messages = [
    		'account.required' => 'Tên tài khoản là trường bắt buộc',
    		'password.required' => 'Mật khẩu là trường bắt buộc',
    	];
        $validator = Validator::make($request->all(), $rules, $messages);

    	if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }
        
        $account = $request->input('account');
        $password = $request->input('password');

        $userInfo = $userModel->filterAccount($account)
                ->filterStatus(UserType::CONST_STATUS_AVAILABLE)
                ->buildCond()->first();

        if($userInfo == NULL) {
            return response()->json(["errMsg" => "Tài khoản không tồn tại"], 422);
        }

        //thuc hien login
        if (app('hash')->check($password, $userInfo->password))
        {
            Auth::attempt(['account' => $account, 'password' => $password]);
            return response()->json(['status' => true], 200);
        } else {
            return response()->json(["status" => "Tài khoản hoặc mật khẩu không đúng"]);
        }

    }

    public function doLogout(Request $request){
        $this->guard()->logout();
        $request->session()->flush();
        $request->session()->regenerate();

        return redirect()->route('login');
    }
}
