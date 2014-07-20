<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Urls_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_urls', $options);
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id']))
            $this->db->delete('feed_urls', array('id' => intval($options['id'])));
        if (isset($options['id_type']))
            $this->db->delete('feed_urls', array('id_type' => intval($options['id_type'])));
        if (isset($options['id_source']))
            $this->db->delete('feed_urls', array('id_source' => intval($options['id_source'])));
        return false;
    }
	public function update($options){
        if(!isset($options['id']))
            return false;
		$data = array(
            'id_type' => $options['type_id'],
            'id_source' => $options['source_id'],
            'url' => $options['url']
        );
        $this->db->where("id", $options['id']);
		$query = $this->db->update('feed_urls', $data);
		return true;
    }
	public function get($options){
        if(isset($options['type_id']))
            $this->db->where('id_type', $options['type_id']);
        if(isset($options['source_id']))
            $this->db->where('id_source', $options['source_id']);
		$query = $this->db->get('feed_urls');
		return $query->result();
    }
}