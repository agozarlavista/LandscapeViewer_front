<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Types_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
		$this->db->insert('feed_types', $options);
		return  $this->db->insert_id();
    }
	public function remove($options){
		if (isset($options['id'])){
            $this->db->delete('feed_types', array('id' => intval($options['id'])));
            $this->load->model('feed_models/sources_model');
            $this->sources_model->remove(Array('id_type'=>$options['id']));
        }
        $str = $this->db->last_query();
        return false;
    }
	public function update($options){
        if(!isset($options['id']))
            return false;
        $data = array(
            'label' => $options['label'],
            'description' => $options['description'],
            'icon' => $options['icon']
        );
        $this->db->where('id', $options['id']);
        $this->db->update('feed_types', $data);
        return true;
    }
	public function get($options){
		$query = $this->db->get('feed_types');
        return $query->result();
    }
}