<?php
namespace App\Libs\MyHttp; 
use App\Libs\MyHttp\HttpResult;

class Http{
    
    const HTTP_METHOD_POST = 'POST';
    const HTTP_METHOD_PUT = 'PUT';
    const HTTP_METHOD_GET = 'GET';
    const HTTP_METHOD_DELETE = 'DELETE';
    const HTTP_METHOD_PATCH = 'PATCH';
    
    const HTTP_CONTENT_TYPE_URLENCODE = 'application/x-www-form-urlencoded';
    const HTTP_CONTENT_TYPE_JSON = 'application/json';
    const HTTP_CONTENT_TYPE_XML = 'application/xml';
    
    private $method;
    private $user;
    private $password;
    private $url;
    private $param;
    private $header;
    private $info;
    
    function __construct() {
        $this->header['Content-Type'] = self::HTTP_CONTENT_TYPE_URLENCODE;
    }
    
    /**
     * set user password for basic authentication
     * @param type $user
     * @param type $password
     * @return \http
     */
    public function setBasicAuth($user, $password){
        
        $this->user = $user;
        $this->password = $password;
        
        return $this;
    }
    
    /**
     * 
     * @param type $type
     * @return \http
     */
    public function setContentType($type){
        $this->header['Content-Type'] = $type;
        return $this;
    }
    
    /**
     * set http method
     * @param type $method
     * @return \http
     */
    private function _setMethod($method){
        
        $this->method = $method;
        
        return $this;
    }
    
    /**
     * set param to post put
     * @param type $param
     * @return \http
     */
    private function _setParam($param){
        
        $this->param = $param;
        
        return $this;
    }
    
    /**
     * set address to request
     * @param type $url
     * @return \http
     */
    private function _setUrl($url){
        
        $this->url = $url;
        
        return $this;
    }
    
    /**
     * 
     * @param type $method
     * @return type
     */
    private function _send($method){
        //khoi tao curl
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->method);
        
        //neu la post and put se them data
        if(in_array(strtolower($method), [strtolower(self::HTTP_METHOD_POST), strtolower(self::HTTP_METHOD_PUT)]))
        {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $this->_getDataToSend());
        }
        
        //neu co auth
        if(!empty($this->user) && !empty($this->password))
        {
            curl_setopt($ch, CURLOPT_USERPWD, $this->user.':'.$this->password); 
        }
        
        //them header
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this->_getheaderToSend());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        $result = curl_exec($ch);
        
        $info = curl_getinfo($ch);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        // Close handle
        curl_close($ch);
        
        return new HttpResult($result, $info, $headerSize);
    }
    
    /**
     * 
     * @param type $info
     */
    private function _setInfo($info){
        $this->info = $info;
    }
    
    /**
     * set header
     * @return type
     */
    private function _getheaderToSend(){
        $retData = [];
        foreach($this->header as $key => $val)
        {
            $retData[] = "$key: $val";
        }
        
        return $retData;
    }
    
    /**
     * xu ly data truoc khi send http request
     * @return type
     */
    private function _getDataToSend()
    {
        switch ($this->header['Content-Type'])
        {
            case self::HTTP_CONTENT_TYPE_JSON:
                $retData = json_encode($this->param);
                break;
            case self::HTTP_CONTENT_TYPE_URLENCODE:
                $retData = http_build_query($this->param);
                break;
            default:
                $retData = $this->param;
                break;
        }
        return $retData;
    }
    /**
     * tao header cho http request
     * @param type $arrHeader key => val
     * @return \http
     */
    public function setHeader($arrHeader, $merge = true)
    {
        if($merge)
        {
            $this->header = array_merge($this->header, $arrHeader);
        }
        else
        {
            $this->header = $arrHeader;
        }
        return $this;
    }
    
    /**
     * Thuc hien get method
     * @param type $url
     * @return type
     */
    public function get($url){
        $this->_setUrl($url)->_setMethod(self::HTTP_METHOD_GET);
        return $this->_send(__FUNCTION__);
    }
    
    /**
     * Thuc hien delete method
     * @param type $url
     * @return type
     */
    public function delete($url){
        $this->_setUrl($url)->_setMethod(self::HTTP_METHOD_DELETE);
        return $this->_send(__FUNCTION__);
    }
    
    /**
     * Thuc hien put method
     * @param type $url
     * @param type $data
     * @return type
     */
    public function put($url, $data = []){
        $this->_setUrl($url)->_setMethod(self::HTTP_METHOD_PUT)->_setParam($data);
        return $this->_send(__FUNCTION__);
    }
    
    /**
     * Thuc hien post method
     * @param type $url
     * @param type $data
     * @return type
     */
    public function post($url, $data = []){
        $this->_setUrl($url)->_setMethod(self::HTTP_METHOD_POST)->_setParam($data);
        return $this->_send(__FUNCTION__);
    }
    
    public function patch($url, $data = []){
        $this->_setUrl($url)->_setMethod(self::HTTP_METHOD_PATCH)->_setParam($data);
        return $this->_send(__FUNCTION__);
    }
    
    /**
     * 
     * @return type
     */
    public function getInfo()
    {
        return $this->info;
    }
    
}