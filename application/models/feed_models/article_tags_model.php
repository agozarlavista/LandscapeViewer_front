<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Article_Tags_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
        $data = array(
            'id_article' => $options['id_article'],
            'id_tag' => $options['id_tag']
        );
		$this->db->insert('feed_article_tags', $data);
        return true;
    }
	public function remove($options){
		return false;
    }
	public function update($options){
        return false;
    }
	public function get($options){
		return false;
    }
}