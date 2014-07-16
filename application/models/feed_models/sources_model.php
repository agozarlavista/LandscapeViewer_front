<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sources_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_sources', array('id' => intval($id));
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id']) && is_numeric($options['id']))
            return $this->db->delete('feed_sources', array('id' => intval($options)));
        return false;
    }
	public function update($options){
		if(isset($options['label']))
			$this->db->set('label', $options['label']);
		if(isset($options['description']))
			$this->db->set('description', $options['description']);
		if(isset($options['icon']))
			$this->db->set('icon', $options['icon']);
		$query = $this->db->update('feed_sources');
		return $query->result();
    }
	public function get($options){
		$this->db->where('type_id', $options['type_id']);
		$query = $this->db->get('feed_sources');
		return $query->result();
    }
}