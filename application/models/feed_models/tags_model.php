<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Tags_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
        $this->db->where('label', strtolower($options['label']));
        $exist = $this->db->get('feed_tags');
        if(count($exist->result()) > 0){
            return $exist->result()[0]['id'];
        }

        $data = array(
            'label' => $options['label']
        );
		$this->db->insert('feed_tags', $data);
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