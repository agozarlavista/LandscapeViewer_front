<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Panoramic_Manager extends CI_Controller {
    public $_auth_mandatory = true;
    public $_user_id;
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
        $this->lang->load('panoramic', 'en');
        $this->load->model('lv_models/panoramics_model');
        $this->load->helper('auth_helper');
    }
    public function index()
    {
        $this->load->view('welcome_message');
    }
    public function say_hello(){
        echo $this->lang->line('SAY_HELLO');
    }
    public function panoramic_create(){
        $params = $this->input->post();
        $this->_user_id = $params['user_id'];
        if(!authenticate($params)){
            return;
        }
        if(!isset($params['label'])){
            send_response('LABEL_NOT_OK', "400");
            return;
        }
        if(!isset($params['articles']) or count($params['articles']) == 0){
            send_response('ARTICLES_NOT_OK', "400");
            return;
        }
        $response = $this->panoramics_model->add($params);
        send_response($response, "200");
    }
    public function panoramic_delete(){

    }
    public function panoramic_article_add(){

    }
    public function panoramic_article_delete(){

    }
    public function get(){
        $params = $this->input->post();
        $this->_user_id = $params['user_id'];
        if(!authenticate($params)){
            return;
        }
        $user_panoramics = $this->panoramics_model->get($params);
        send_response($user_panoramics, "200");
    }
}