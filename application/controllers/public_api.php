<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Public_Api extends CI_Controller {
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
    }
    public function index()
    {
        $this->load->view('welcome_message');
    }
    public function get_session(){
        $this->load->library('session');
        var_dump($this->session->userdata('lv_user'));
    }
    public function auth(){
        $this->load->library('session');
        $post = $this->input->post();
        $this->load->model('lv_models/auth_model');
        //$this->load->library('session');
        if(!isset($post['email'])){
            $this->send_response(array("message"=>array("title"=>"Auth say OUTCH !", "message"=>"Bad Request")), "400");
            return;
        }
        //si l'user n'existe pas
        $queryAccount = $this->auth_model->get(array("email"=>$post['email'], "password"=>$post['password']));
        if(count($queryAccount) == 0){
            $this->send_response(array("message"=>array("title"=>"Non authorized", "message"=>"This user does not exist, check your email and password")), "401");
            return;
        }
        if(count($queryAccount) > 1){
            $this->send_response(array("message"=>array("title"=>"Non authorized", "message"=>"This user does not exist, check your email and password")), "401");
            return;
        }
        $this->session->set_userdata('lv_user', json_encode($queryAccount));
        //$this->session->userdata(json_encode($queryAccount));
        $this->send_response($queryAccount, "200");
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
        $this->send_response($query, "200");
    }
    public function get(){

    }
    public function post(){

    }
    public function put(){

    }
    public function delete(){

    }
    public function send_response($data, $httpCode){
        $this->output->set_status_header($httpCode);
        //$this->response($data, $httpCode);
        $this->output->set_output(json_encode($data));
        return;
        //echo "prout";
    }
}