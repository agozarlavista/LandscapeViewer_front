<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class page extends CI_Controller {
    public $_auth_mandatory = true;
    public $_user_id;
    public function index()
    {
        if($this->uri->segment(2, 0) != "0"){
            $page_name = $this->uri->segment(2, 0);
            if($this->uri->segment(3, 0) != "0"){
                if($this->uri->segment(4, 0) != "0"){
                    $panoramic_label = $this->uri->segment(4, 0);
                    $this->show_panoramic($page_name, $panoramic_label);
                }else{
                    switch($this->uri->segment(3, 0)){
                        case 'panoramic':
                            $this->show_user_panoramics($page_name);
                            break;
                        case 'search':
                            break;
                    }
                }
            }else{
                $this->show_user_page($page_name);
            }
        }else{
            echo "on affiche des liens page user";
        }
    }
    public function show_user_page($page_id){
        echo "show_user_page".$page_id;
    }
    public function show_user_panoramics($page_id){
        echo "show_user_panoramics_list".$page_id;
    }
    public function show_panoramic($page_id, $panoramic_label){
        echo "show_user precise panoramic details ".$panoramic_label;
    }
}