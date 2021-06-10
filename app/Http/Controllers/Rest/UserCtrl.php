<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserModel;
use Validator, DB;

class UserCtrl extends Controller
{
    private $userModel;

    public function __construct(UserModel $userModel) {
        $this->userModel = $userModel;
    }

    public function listUser(Request $request)
    {
        
        $perPage = $request->input('perPage', 10);

        // $data = $this->userModel->orderBy('id','desc')->paginate($perPage);
        $data = $this->userModel->orderBy('id','desc')->get();
        return response()->json($data);

    }

    public function insertRequest(Request $request)
    {
        $validate = Validator::make($request->all(), [
                    'name' => 'required',
                    'phone' => 'required',
                    'address' => 'required',
                    'email' => 'required|email',
                        ], [
                    'name.required' => 'Họ và tên không được bỏ trống',
                    'phone.required' => 'SĐT không được bỏ trống',
                    'address.required' => 'Địa chỉ không được bỏ trống',
                    'email.required' => 'Email không được bỏ trống',
                    'email.email' => 'Email không đúng định dạng',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->messages(), 422);
        }
        DB::beginTransaction();

        // try {
            $name = $request->input('name');
            $phone = $request->input('phone');
            $email = $request->input('email');
            $address = $request->input('address');
    
            $id = $this->userModel->insertGetId([
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'address' => $address,
            ]);
            DB::commit();

            return response()->json(['id' => $id, 'status' => true]);
    
        // } catch (\Throwable $th) {
        //     DB::rollback();
        //     return response()->json(['errMsg' => 'Xảy ra lỗi hệ thống!'], 422);
        // }
    }
    
    public function updateUser(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'email' => 'required|email',
                ], [
            'name.required' => 'Họ và tên không được bỏ trống',
            'phone.required' => 'SĐT không được bỏ trống',
            'address.required' => 'Địa chỉ không được bỏ trống',
            'email.required' => 'Email không được bỏ trống',
            'email.email' => 'Email không đúng định dạng',
        ]);

        if ($validate->fails()) {
            return response()->json($validate->messages(), 422);
        }
        DB::beginTransaction();

        try {
            $userInfo = $this->userModel->find($id);
            $userInfo->name = $request->name;
            $userInfo->phone = $request->phone;
            $userInfo->address = $request->address;
            $userInfo->email = $request->email;

            $userInfo->save();
            DB::commit();

            return response()->json(['status' => true]);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json(['errMsg' => 'Xảy ra lỗi hệ thống!'], 422);
        }
    }

    public function deleteUser($id)
    {
        DB::beginTransaction();

        try {
            $userInfo = $this->userModel->find($id);
         
            $userInfo->delete();
            DB::commit();

            return response()->json(['status' => true]);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json(['errMsg' => 'Xảy ra lỗi hệ thống!'], 422);
        }
    }

    public function detailUser($id)
    {
        try {
            $userInfo = $this->userModel->find($id);
            return response()->json($userInfo);

        } catch (\Throwable $th) {
            return response()->json(['errMsg' => 'Xảy ra lỗi hệ thống!'], 422);
        }
    }
}
