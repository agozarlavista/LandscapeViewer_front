<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Urls_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_urls', array('id' => intval($id));
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id']) && is_numeric($options['id']))
            return $this->db->delete('feed_urls', array('id' => intval($options)));
        return false;
    }
	public function update($options){
		if(isset($options['url']))
			$this->db->set('url', $options['url']);
		if(isset($options['type_id']))
			$this->db->set('type_id', $options['type_id']);
		if(isset($options['source_id']))
			$this->db->set('source_id', $options['source_id']);
		$query = $this->db->update('feed_urls');
		return $query->result();
    }
	public function get($options){
		$query = $this->db->get('feed_urls');
		return $query->result();
    }
}