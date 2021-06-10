<?php

namespace App\Http\Middleware;

use Closure;

class checkRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role, $isAdmin = 0)
    {
        $userRoleConfg = app('UserRoleConfig');
        //neu cho phep quyen admin truy cap va neu la superAdmin => cho qua
        if((int) $isAdmin == 1 && $userRoleConfg->isSuperAdmin())
            return $next($request);
        $arrRole = explode('|', $role);
        foreach($arrRole as $role){
            if($userRoleConfg->checkRole($role))
                return $next($request);
        }
        
        if($request->ajax()){
            return response()->json(['message' => 'Bạn không có quyền thực hiện chức năng này'] , 422);
        }
        return redirect()->route('defaultPage');
    }
}
