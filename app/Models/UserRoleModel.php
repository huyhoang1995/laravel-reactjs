<?php

namespace App\Models;

use App\Models\MyModel;

class UserRoleModel extends MyModel
{
    protected $table = 'user_role';
    public $timestamps = true;
    
    function filterUserId($userId) {
        if (!empty($userId)) {
            $this->setFunctionCond('where', ['user_id', $userId]);
        }
        return $this;
    }
    
    function filterRole($role){
        $this->setFunctionCond('where', ['role', $role]);
        return $this;
    }
    
    function filterRoleDiffAdmin($role) {
        $this->setFunctionCond('where', ['role', '!=' , $role]);
        return $this;
    }
}
