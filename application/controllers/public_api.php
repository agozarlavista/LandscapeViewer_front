<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Public_Api extends CI_Controller {
    public $_auth_mandatory = true;
    public $_user_id;
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
        $this->lang->load('auth', 'en');
        $this->load->helper('auth_helper');
    }
    public function index()
    {
        $this->load->view('welcome_message');
    }
    public function get_auth_validation(){
        $params = $this->input->post();
        $this->_auth_mandatory = false;
        authenticate($params);
    }
    public function get_session(){
        check_session();
    }
    public function auth(){
        $this->_auth_mandatory = false;
        $this->load->library('session');
        $post = $this->input->post();
        $this->load->model('lv_models/auth_model');
        /*if(!authenticate($post)){
            return;
        }*/
        $queryAccount = $this->auth_model->get(array("email"=>$post['email'], "password"=>$post['password']));
        if(count($queryAccount) == 1){
            $this->session->set_userdata('lv_user', json_encode($queryAccount));
            $this->_auth_mandatory = true;
            $this->_user_id = $queryAccount[0]['id'];
            send_response($queryAccount, "200");
        }else{
            send_response(array('message'=>array('message'=>'UNABLE_TO_LOG_USER')), "401");
        }

    }
    public function login(){
        $params = $this->input->post();
        $this->load->model('lv_models/auth_model');
        $data_user = $this->auth_model->create_session($params);
        if(!$data_user){
            authenticate($params);
            return;
        }
        $this->session->set_userdata('lv_user', json_encode($data_user));
        $this->_auth_mandatory = true;
        $this->_user_id = $data_user[0]['id'];
        send_response($data_user, 200);
    }
    public function check_auth_validation(){
        //all auth api have to check that... have return 200 true or non authorized
    }
    public function create_account(){
        $post = $this->input->post();
        $this->load->model('lv_models/auth_model');
        if(!isset($post['avatar']) or $post['avatar'] == ""){
            $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"You must upload an avatar")), "401");
            return;
        }
        if(!isset($post['page_name']) or $post['page_name'] == ""){
            $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"You must complete your page name")), "401");
            $queryName = $this->auth_model->get(array('page_name'=>$post['page_name']));
            if(count($queryName) > 0)
                $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"Your page name is already in use")), "401");
            return;
        }
        if(!isset($post['email']) or $post['email'] == ""){
            $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"You must complete your email")), "401");
            $queryMail = $this->auth_model->get(array('email'=>$post['email']));
            if(count($queryMail) > 0)
                $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"Your email is already in use")), "401");
            return;
        }
        if(!isset($post['password']) or $post['password'] == ""){
            $this->send_response(array("message"=>array("title"=>"Incomplete form", "message"=>"You must complete your password")), "401");
            return;
        }
        $query = $this->auth_model->add($post);
        $this->_auth_mandatory = true;
        $this->_user_id = $query[0]['id'];
        $this->send_response($query, "200");
    }
    public function add_article_like(){
        $params = $this->input->post();
        $this->_auth_mandatory = false;
        $this->_user_id = $params['user_id'];
        if(!authenticate($params)){
            return 'you must be logged';
        }
        $this->load->model('feed_models/articles_model');
        $response = $this->articles_model->add_like($params);
        send_response($response, 200);
    }
    public function get(){

    }
    public function post(){

    }
    public function put(){

    }
    public function delete(){

    }
    /*public function send_response($data, $httpCode){
        // all auth services have return a send_response by this way with HTTP code
        $this->output->set_status_header($httpCode);
        //$this->response($data, $httpCode);
        $this->output->set_output(json_encode($data));
        return;
        //echo "prout";
    }*/
}