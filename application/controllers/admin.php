<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
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