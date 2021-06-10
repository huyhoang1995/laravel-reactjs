<?php

namespace App\Libs\Config;

class FileConfig {

    const CONST_STORAGE_DATA_DISK = 'storageData';
    const CONST_AVAILABLE_DISK = 'available';
    
    const CONST_AVATAR_STAFF_PATH = 'avatar/staff';
    const CONST_AVATAR_CUSTOMER_PATH = 'avatar/customer';
    const CONST_CATEGORY_PATH = 'category';
    const CONST_ARTICLE_PATH_169 = 'article/avatar169';
    const CONST_ARTICLE_PATH_43 = 'article/avatar43';
    
    const CONST_URL_FILE_TYPE_CATEGORY = 'category';
    const CONST_URL_FILE_TYPE_AVATAR_STAFF = 'avatarStaff';
    const CONST_URL_FILE_TYPE_CUSTOMER_STAFF = 'avatarCustomer';
    const CONST_URL_FILE_TYPE_ARTICLE = 'article';

    private $listUrlType;

    public function __construct() {
        $this->listUrlType = [
            self::CONST_URL_FILE_TYPE_ARTICLE,
            self::CONST_URL_FILE_TYPE_AVATAR_STAFF,
            self::CONST_URL_FILE_TYPE_CATEGORY
        ];
    }

    public function getUrlFile($path, $type, $thumb = false) {
        $dataRoute = ['data' => $path];
        if($this->isUrlType($type)){
            $dataRoute['type'] = $type;
        }
        if($thumb){
            $dataRoute['thumb'] = '1';
        }
        return route('getFile') . '?' . http_build_query($dataRoute);
    }

    public function isUrlType($type) {
        return in_array($type, $this->listUrlType);
    }
    
    public function getFilePathFM($url){
        $preg = '/^\/' . config('lfm.url_prefix') . '/';
        return preg_replace($preg, '', $url);;
    }

}
