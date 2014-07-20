<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Medias_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_media', $options);
        $str = $this->db->last_query();
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id']))
            $this->db->delete('feed_media', array('id' => intval($options['id'])));
        return true;
    }
	public function update($options){
        return true;
    }
	public function get($options){
        $query = $this->db->get('feed_media');
		return $query->result();
    }
}