<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Feed_Api_V1 extends CI_Controller {
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
    }
    public function index()
    {
        $this->load->view('welcome_message');
    }
    public function auth(){
        $post = $this->input->post();
        //if(!isset($post['email'])){
            $this->send_result([], 500);
        //}
    }
    public function get(){

    }
    public function post(){

    }
    public function put(){

    }
    public function delete(){

    }
    public function send_result($data = null, $httpCode = null){
        $this->response($data, $httpCode);
    }
}