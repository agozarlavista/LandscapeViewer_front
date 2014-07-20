<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Types_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
        $data = array(
            'label' => strtolower($options['label']),
            'description' => strtolower($options['description']),
            'icon' => $options['icon']
        );
		$this->db->insert('feed_types', $data);
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
            'label' => strtolower($options['label']),
            'description' => strtolower($options['description']),
            'icon' => $options['icon']
        );
        $this->db->where('id', $options['id']);
        $this->db->update('feed_types', $data);
        return true;
    }
	public function get($options){
        $this->db->select('feed_types.id, feed_types.label, feed_types.description, feed_types.icon, feed_media.url, feed_media.dominante, feed_media.width, feed_media.height');
        $this->db->from('feed_types');
        $this->db->join('feed_media', 'feed_media.id = feed_types.icon');

        $query = $this->db->get();
        $this->db->last_query();
        return $query->result();

        /*$this->db->select('id, label, description, icon');
        $this->db->from('feed_types');
        $this->db->join('feed_media', 'id = feed_types.icon', 'left');
		$query = $this->db->get();
        */
    }
}