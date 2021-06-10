<?php

namespace App\Libs\Config;

use App\Models\UserRoleModel;

class UserRoleConfig {

    private $listRole;
    private $listRoleCurUser;
    private $curUserInfo;

    const CONST_ROLE_MONITOR = 'MONITOR';
    const CONST_ROLE_USER = 'USER';

    function __construct() {
        $this->listRole = [
            self::CONST_ROLE_USER => 'Người dùng',
            self::CONST_ROLE_MONITOR => 'Người điều hành',
        ];

        $this->curUserInfo = auth()->user();
        $this->listRoleCurUser = $this->getListRoleCurUser();
    }

    /**
     * Lay danh sach role
     * @return type
     */
    function getList() {
        return $this->listRole;
    }

    /**
     * Kiem tra tai khoan co phai admin he thong khong
     * @return type
     */
    function isSuperAdmin() {
        return ((int) $this->curUserInfo->is_admin == 1) ? true : false;
    }

    /**
     * kiem tra role cua nguoi dung hien tai
     * @param type $role
     * @return type
     */
    function checkRole($role) {

        return in_array($role, $this->listRoleCurUser);
    }

    /**
     * Thuc hien lay danh sach role cua nguoi dung
     * @return type
     */
    function getListRoleCurUser() {
        $userRoleModel = new UserRoleModel();
        $userId = isset($this->curUserInfo->id)? $this->curUserInfo->id: 0;
        $result = $userRoleModel->filterUserId($userId)->buildCond()->get();
        $retVal = [];
        if((int)$result->count() > 0){
            $retVal = $result->pluck('role')->toArray();
        }
        return $retVal;
    }
    
    /**
     * Kiem tra role co ton tai ko
     * @param type $listRole
     * @return boolean
     */
    public function roleExists($listRole){
        $collectRole = collect($listRole);
        $result = true;
        $collectRole->each(function($item, $key){
            if(!in_array($item, array_keys($this->listRole))){
                $result = false;
                return false;
            }
        });
        
        return $result;
    }
}
