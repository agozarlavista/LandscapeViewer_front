<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Safems extends CI_Controller {
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
    }
    public function index()
    {
        $this->load->view('welcome_message');
    }
    public function account_create(){
        $this->load->model('safems/user_model');
        $params = $this->input->post();
        $response = $this->user_model->add($params);
        $this->send_response($response, 200);
    }
    public function request_add(){
        $this->load->model('safems/request_model');
        $params = $this->input->post();
        $response = $this->request_model->add($params);
        send_response($response, 200);
    }
    public function response_add(){
        $this->load->model('safems/responses_model');
        $params = $this->input->post();
        $response = $this->responses_model->add($params);
        send_response($response, 200);
    }
    public function response_validation(){
        $this->load->model('safems/responses_model');
        $params = $this->input->post();
        $response = $this->responses_model->add($params);
        send_response($response, 200);
    }
    public function reponse_like(){
        $this->load->model('safems/responses_model');
        $params = $this->input->post();
        $params = $this->input->post();
        $response = $this->responses_model->add($params);
        send_response($response, 200);
    }
    public function send_response($data, $httpCode){
        $this->output->set_status_header($httpCode);
        $this->output->set_output(json_encode($data));
        return;
    }
}