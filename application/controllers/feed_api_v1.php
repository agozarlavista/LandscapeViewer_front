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
	
	public function add_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->add($post);
		echo "added";
		die();
	}
	public function edit_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->update($post);
		echo "update";
		die();
	}
	public function remove_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->remove($post);
		echo "removed";
		die();
	}
	public function get_types_list(){
		echo "1 ";
		$post = $this->input->post();
		echo "2 ";
		$this->load->model('feed_models/types_model');
		echo "3 ";
		$result = $this->types_model->get($post);
		echo "4 ";
		//$this->send_response($result);
		echo json_encode($result);
	}
	/*public function add_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->add($post);
		echo "added";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function edit_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->update($post);
		echo "update";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function remove_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->remove($post);
		echo "removed";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function get_sources_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->get($post);
		$this->send_response($result);
	}
	public function add_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->add($post);
		echo "added";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function edit_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->update($post);
		echo "update";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function remove_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->remove($post);
		echo "removed";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function get_urls_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->get($post);
		$this->send_response($result);
	}*/
	public function send_response($data){
		//echo "send response";
		echo json_encode($data);
	}
}