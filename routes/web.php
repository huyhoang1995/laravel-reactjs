<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', 'HomeCtrl@redirectDefaultPage');

Route::get('/', function () {
    return view('welcome');
});
Route::get('/login', 'RenderViewCtrl@login')->name('login');

Route::middleware(['web', 'auth'])->group(function () {
    Route::get("/user", 'RenderViewCtrl@user')->name('user');
    Route::get('/userInfo','RenderViewCtrl@userInfo')->name('userInfo');
});

//danh sach rest
Route::group(['prefix' => 'rest'], function () {
    Route::get('/user', 'Rest\UserCtrl@listUser');
    Route::post('/user', 'Rest\UserCtrl@insertRequest');
    Route::post('/user/{id}', 'Rest\UserCtrl@updateUser');
    Route::delete('/user/{id}', 'Rest\UserCtrl@deleteUser');
    Route::get('/detailUser/{id}', 'Rest\UserCtrl@detailUser');
});

// Route::group(['prefix' => 'rest', 'middleware' => ['web', 'auth']], function () {
//     //User
//     Route::get('/users/role', 'Rest\UserCtrl@roleList')->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::put('/users/resetPassword/{id}', 'Rest\UserCtrl@resetPassword')->where(['id' => '[\d]+'])->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::put('/users/role/{id}', 'Rest\UserCtrl@changeRole')->where(['id' => '[\d]+'])->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::post('/users/status/{id}', 'Rest\UserCtrl@changeStatus')->where(['id' => '[\d]+'])->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::post('/users', 'Rest\UserCtrl@insertUser')->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::get('/users', 'Rest\UserCtrl@listUser')->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);
//     Route::get('/users/{id}', 'Rest\UserCtrl@userInfo')->where(['id' => '[\d]+'])->middleware(['checkRole:superAdmin|MANAGER_CLINIC,1']);


//     Route::delete('/users/{id}','Rest\UserCtrl@deleteItem'); 
//     Route::get('/users/usersRole/{id}', 'Rest\UserCtrl@usersRole');

//     Route::get('/users/listGender', 'Rest\UserCtrl@listGender');
//     Route::get('/users/listStatus', 'Rest\UserCtrl@listStatus');

//     Route::post('/users/personal', 'Rest\UserCtrl@personalUpdate');
//     Route::get('/users/personal', 'Rest\UserCtrl@personalInfo');
//     Route::post('/users/changePassword', 'Rest\UserCtrl@changePassword');

// });

Route::group(['prefix' => 'file', 'middleware' => 'web'], function () {
    Route::get('/', 'FileCtrl@showFile')->name('getFile');
});

Route::post('/login', 'LoginCtrl@doLogin');
Route::get('/logout', 'LoginCtrl@doLogout');