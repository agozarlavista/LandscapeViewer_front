<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin extends CI_Controller {
	public $_auth_mandatory = true;
    public $_user_id;
    public function index()
	{
        $data['js'][] = "js/landscape/admin.js";
        //$data['css'][] = "styles/admin/admin.css";

        $this->load->helper('url');
        $data['rootURL'] = base_url();
		$this->load->view('_header', $data);
		$this->load->view('admin_view', $data);
		$this->load->view('_footer', $data);
	}
    public function articles(){
        $data['js'][] = "js/landscape/google_feed_api.js";
        $data['js'][] = "js/landscape/lv_feed_app.js";
        $data['js'][] = "js/landscape/articles.js";
        //$data['css'][] = "styles/admin/articles.css";

        $this->load->helper('url');
        $data['rootURL'] = base_url();
        $this->load->view('_header', $data);
        $this->load->view('articles_view');
        $this->load->view('_footer', $data);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */