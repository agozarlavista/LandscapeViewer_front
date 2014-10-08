<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class article extends CI_Controller {
    public $_auth_mandatory = true;
    public $_user_id;
    public function index()
    {
        $string = urldecode(urldecode(explode( '-article-', $this->uri->segment(2, 0))[0]));
        $string = preg_replace('/\_+/', ' ', $string);
        $string= preg_replace('/&#(\d+);/me',"chr(\\1)",$string); #decimal notation
        $string= preg_replace('/&#x([a-f0-9]+);/mei',"chr(0x\\1)",$string);  #hex notation
        $article_id = explode( '-article-', $this->uri->segment(2, 0))[1];
        //echo htmlentities($string);
        //$string = htmlentities($string);
        $this->load->model('feed_models/articles_model');
        $query = $this->articles_model->get(array('id'=>$article_id));
        //var_dump($query);
        var_dump(json_decode($query[0]['info_object']));
    }
}