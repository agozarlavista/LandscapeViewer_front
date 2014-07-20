<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sources_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_sources', $options);
        $str = $this->db->last_query();
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id'])){
            $this->db->delete('feed_sources', array('id' => intval($options['id'])));
            $this->load->model('feed_models/urls_model');
            $this->sources_model->remove(Array('id_source'=>$options['id']));
        }
        if(isset($options['id_type'])){
            $this->db->delete('feed_sources', array('id_type' => intval($options['id_type'])));
            $this->load->model('feed_models/urls_model');
            $this->urls_model->remove(Array('id_type'=>$options['id_type']));
        }
        $str = $this->db->last_query();
        return true;
    }
	public function update($options){
        if(!isset($options['id']))
            return false;
        $data = array(
            'id_type' => $options['type_id'],
            'label' => $options['label'],
            'description' => $options['description'],
            'icon' => $options['icon']
        );
        $this->db->where("id", $options['id']);
        $query = $this->db->update('feed_sources', $data);
        $str = $this->db->last_query();
        return true;
    }
	public function get($options){
        if(isset($options['type_id']))
            $this->db->where('id_type', $options['type_id']);

		//$this->db->where('type_id', $options['type_id']);
		$query = $this->db->get('feed_sources');
        $str = $this->db->last_query();
		return $query->result();
    }
}