<?php

namespace App\Libs\Config\ListType;

class UserType {

    const CONST_STATUS_AVAILABLE = 'AVAILABLE';
    const CONST_STATUS_DISABLED = 'DISABLED';
    const CONST_STATUS_DELETED = 'DELETED';
    const CONST_TYPE_STAFF = 'staff';
    const CONST_TYPE_CUSTOMER = 'customer';
    const CONST_GENDER_MALE = 'male';
    const CONST_GENDER_FEMALE = 'female';

    private $listStatus;
    private $listType;
    private $listGender;

    public function __construct() {
        $this->listStatus = [
            self::CONST_STATUS_AVAILABLE => 'Hoạt động',
            self::CONST_STATUS_DISABLED => 'Tạm dừng',
        ];

        $this->listType = [
            self::CONST_TYPE_STAFF => 'Nhân viên',
            self::CONST_TYPE_CUSTOMER => 'Khách hàng',
        ];

        $this->listGender = [
            self::CONST_GENDER_MALE => 'Nam',
            self::CONST_GENDER_FEMALE => 'Nữ',
        ];
    }

    public function listStatus() {
        return $this->listStatus;
    }

    /**
     * Danh sach gioi tinh
     * @return type
     */
    public function listGender() {
        return $this->listGender;
    }

    /**
     * Thuc hien kiem tra trang thai
     * @param type $arrStatus
     * @return boolean
     */
    public function existsStatus($arrStatus) {
        $collectStatus = collect($arrStatus);
        $result = true;
        $listStatus = [
            self::CONST_STATUS_AVAILABLE,
            self::CONST_STATUS_DELETED,
            self::CONST_STATUS_DISABLED,
        ];
        $collectStatus->each(function($item, $key) use (&$result, $listStatus) {
            if (!in_array($item, $listStatus)) {
                $result = false;
                return false;
            }
        });

        return $result;
    }

    /**
     * Thuc hien kiem tra gioi tinh
     * @param type $arrGender
     * @return boolean
     */
    public function existsGender($arrGender) {
        $collectGender = collect($arrGender);
        $result = true;
        $collectGender->each(function($item, $key) use (&$result) {
            if (!in_array($item, array_keys($this->listGender))) {
                $result = false;
                return false;
            }
        });

        return $result;
    }

}
