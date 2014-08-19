<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class download extends CI_Controller {
	public $_auth_mandatory = true;
    public $_user_id;
    public function index()
	{
        $this->load->view('download');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */