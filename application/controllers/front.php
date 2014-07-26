<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class front extends CI_Controller {

	public function index()
	{
        $data['js'][] = "js/landscape/public_api.js";
        $data['js'][] = "js/landscape/front.js";
        $data['css'][] = "styles/lv-front-styles.css";

        $this->load->helper('url');
        $data['rootURL'] = base_url();
		$this->load->view('_front_header', $data);
		$this->load->view('front', $data);
		$this->load->view('_front_footer', $data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */