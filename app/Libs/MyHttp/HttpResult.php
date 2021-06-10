<?php
namespace App\Libs\MyHttp;

class HttpResult
{

    private $result;
    private $info;
    private $body;
    private $header;

    public function __construct($result, $info, $headerSize)
    {
        $this->result = $result;
        $this->info = $info;
        $this->header = $this->_buildHeader(substr($result, 0, $headerSize));
        $this->body = substr($result, $headerSize);
    }

    /**
     * thuc hien tao header
     *
     * @param [type] $headerRaw
     * @return void
     */
    private function _buildHeader($headerRaw)
    {
        $headers = [];
        $data = explode("\n", trim($headerRaw));
        array_shift($data);
        foreach ($data as $part) {
            $part = trim($part);
            if(!empty($part)){
                $middle = explode(":", $part);
                if (count($middle) < 2) continue;
                $key = array_shift($middle);
                $headers[trim($key)] = trim(implode($middle));
            }
            
        }
        return $headers;
    }

    /**
     * lay raw body
     *
     * @return void
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * lay ket qua theo json
     *
     * @return void
     */
    public function getJsonResult()
    {
        return json_decode($this->body);
    }

    /**
     * lay ket qua theo xml rpc
     *
     * @return void
     */
    public function getRpcResult()
    {
        return xmlrpc_decode($this->body);
    }

    /**
     * kiem tra xem request theo rpc co loi ko
     *
     * @return boolean
     */
    public function hasRpcError()
    {
        $normalError = $this->hasError();
        if ($normalError) {
            return true;
        }

        return xmlrpc_is_fault(xmlrpc_decode($this->body));
    }

    /**
     * Kiem tra http co loi ko
     *
     * @return boolean
     */
    public function hasError()
    {
        $info = $this->info;
        $httpStatus = (int) $info['http_code'];
        return ($httpStatus < 200 or $httpStatus > 299) ? true : false;
    }

    /**
     * Thuc hien lay thong tin goi response
     *
     * @return void
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Thuc hien lay http response Status
     *
     * @return void
     */
    public function getHttpStatus()
    {
        return $this->info['http_code'];
    }

    /**
     * Thuc hien lay header theo key
     *
     * @param [type] $key
     * @return void
     */
    public function getHeaderVar($key){
        return isset($this->header[$key])? $this->header[$key]: false;
    }

    /**
     * Thuc hien lay danhs sach header
     *
     * @return void
     */
    public function getHeader(){
        return $this->header;
    }
}
