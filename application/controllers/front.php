<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class front extends CI_Controller {
    public $_auth_mandatory = false;
    public $_user_id;
    public function index()
	{
        $this->load->library('session');
        $data['js'][] = "js/landscape/public_api.js";
        $data['js'][] = "js/landscape/front.js";
        $data['css'][] = "styles/lv-front-styles.css";
        $data['session'] = $this->session->userdata('lv_user');

        // have to create model for :
        //user infos must contain : 1_ user_search_sessions 2_ user_panoramics_list 3_ user_last_friends_interests
        $data['user_infos'] = [];
        if($data['session'] != false){
            $data['js'][] = "js/landscape/user.js";
        }
        $this->load->helper('url');
        $data['rootURL'] = base_url();
		$this->load->view('_front_header', $data);
		$this->load->view('front', $data);
		$this->load->view('_front_footer', $data);
	}
    public function login(){
        $data['js'][] = "js/landscape/public_api.js";
        $data['js'][] = "js/landscape/login.js";
        $data['css'][] = "styles/lv-front-styles.css";

        $this->load->helper('url');
        $data['rootURL'] = base_url();
        $this->load->view('_public_header', $data);
        $this->load->view('login', $data);
        $this->load->view('_public_footer', $data);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */