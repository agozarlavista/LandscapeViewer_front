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
		echo $result;
		die();
	}
	public function remove_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->remove($post);
		echo $result;
		die();
	}
	public function get_types_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->get($post);
		$this->send_response($result);
		//echo json_encode($result);
	}
	public function add_source(){
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
	}
	public function send_response($data){
		//echo "send response";
		echo json_encode($data);
	}
    public function file_upload(){

        // A list of permitted file extensions
        $allowed = array('png', 'jpg', 'gif','zip');

        if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

            $extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

            if(!in_array(strtolower($extension), $allowed)){
                echo '{"status":"error"}';
                exit;
            }

            if(move_uploaded_file($_FILES['upl']['tmp_name'], 'uploads/'.$_FILES['upl']['name'])){
                echo '{"status":"success"}';
                exit;
            }
        }

        echo '{"status":"error"}';
        exit;

        $config['upload_path'] = './uploads/icons/';
        $config['allowed_types'] = 'gif|jpg|png';
        /*$config['max_size']	= '100';
        $config['max_width']  = '1024';
        $config['max_height']  = '768';*/

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload())
        {
            $error = array('error' => $this->upload->display_errors());
            return json_encode($error);
            //$this->load->view('upload_form', $error);
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());

            /*$config['image_library'] = 'gd2';
            $config['source_image']	= $this->upload->data();
            $config['create_thumb'] = TRUE;
            $config['maintain_ratio'] = TRUE;
            $config['width']	= 75;
            $config['height']	= 75;
            $this->load->library('image_lib', $config);
            $this->image_lib->resize();*/

            return json_encode($data);
            //$this->load->view('upload_success', $data);
        }
    }
}