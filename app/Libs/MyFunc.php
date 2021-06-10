<?php

namespace App\Libs;

use Carbon\Carbon;

class MyFunc {

    function __construct() {
        
    }

    /**
     * Ham tinh toan so sanh thoi gian $date1 - $date 2
     * @param \App\Libs\DateTime $date1
     * @param \App\Libs\DateTime $date2
     * @return type
     */
    function dateDiff($date1, $date2) {
        $date1 = new \DateTime($date1);
        $date2 = new \DateTime($date2);
        $interval = $date2->diff($date1);
        return (int) $interval->format('%R%a days');
    }

    /**
     * kiem tra date co phai la qua khu ko
     * @param \App\Libs\DateTime $date
     * @return type
     */
    function dateIsPast($date) {
        $date = new \DateTime($date);
        $now = new \DateTime();
        return ($date < $now) ? true : false;
    }

    function explodeName($name) {
        $arrName = explode(' ', $name);
        $lastName = $arrName[0];
        unset($arrName[0]);
        $firstName = implode(' ', $arrName);

        return ['firstName' => $firstName, 'lastName' => $lastName];
    }

    function getValue($value, $defaultVal = '') {
        return !empty($value) ? $value : $defaultVal;
    }

    function vnToStr($str) {

        $unicode = array(
            'a' => 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd' => 'đ',
            'e' => 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i' => 'í|ì|ỉ|ĩ|ị',
            'o' => 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u' => 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y' => 'ý|ỳ|ỷ|ỹ|ỵ',
            'A' => 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'D' => 'Đ',
            'E' => 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'I' => 'Í|Ì|Ỉ|Ĩ|Ị',
            'O' => 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'U' => 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'Y' => 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
        );

        foreach ($unicode as $nonUnicode => $uni) {

            $str = preg_replace("/($uni)/i", $nonUnicode, $str);
        }


        return $str;
    }

    function checkExistData($data) {
        return (isset($data) && !empty($data));
    }

    function getData($data, $default) {
        return $this->checkExistData($data) ? $data : $default;
    }

    /**
     * convert date utc+7 to utc+0
     * @param type $date string Y-m-d H:i:s
     * @return type string Y-m-d H:i:s
     */
    function utc7To0($date) {
        $retVal = '';
        $dt = new \DateTime($date, new \DateTimeZone('Asia/Ho_Chi_Minh'));
        if ($dt) {
            $dt->setTimeZone(new \DateTimeZone('UTC'));
            $retVal = $dt->format('Y-m-d H:i:s');
        }
        return $retVal;
    }

    function servicePing($host, $port = 389, $timeout = 1) {
        $op = @fsockopen($host, $port, $errno, $errstr, $timeout);
        if (!$op)
            return false; //DC is N/A
        else {
            fclose($op); //explicitly close open socket connection
            return true; //DC is up & running, we can safely connect with ldap_connect
        }
    }

    function getAccountOfEmail($email) {
        return substr($email, 0, strpos($email, '@'));
    }

    function detach($v) {
        $e = '$detach = ' . $v . ';';
        $e .= 'unset(' . $v . ');';
        $e .= $v . ' = $detach;';
        return $e;
    }
    
    /**
     * Thuc hien so sanh hien tai vs $date => tra ve minues
     * @param type $date
     * @return type
     */
    function diffWithNow($date){
        $now = Carbon::now();
        $difDate = Carbon::createFromFormat('Y-m-d H:i:s', $date);
        return $now->diffInMinutes($difDate, false);
    }
    
    /**
     * Thuc hien lay do main tu url
     * @param type $url
     * @return type
     */
    function getDomain($url){
        $parse = parse_url($url);
        return $parse['host'];
    }
    
    /**
     * random 8 ký tự bat ky
     * @return type
     */
    function rad8Char() {
        return substr(uniqid(), 0, 8);
    }
    
    /**
     * random 6 số bất kỳ
     * @return type
     */
    function rad6Numeric() {
        return substr(mt_rand(), 0, 6);
    }

    /**
     * random 8 số bất kỳ
     *
     * @return void
     */
    function rad8Numeric(){
        return substr(mt_rand(), 0, 8);
    }

    /**
     * Thuc hien replace ky tu cuoi cung
     *
     * @param [type] $search
     * @param [type] $replace
     * @param [type] $subject
     * @return void
     */
    function strLastReplace($search, $replace, $subject){
        $pos = strrpos($subject, $search);

        if($pos !== false)
        {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }

        return $subject;
    }

    /**
     * Thuc hien lay file name tu path
     *
     * @param [type] $path
     * @return void
     */
    function getFileNameFromPath($path){
        $path = str_replace('\\', '/', $path);
        $arrExplode = explode('/', $path);
        return end($arrExplode);
    }
}
