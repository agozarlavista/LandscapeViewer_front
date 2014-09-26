<?php
/**
 * Created by PhpStorm.
 * User: simondelamarre
 * Date: 04/08/2014
 * Time: 18:54
 * panoramics must receive a list of articles for push on panoramic table.
 * there articles list must be linked to user_id to create panoramic
 * functions : add : isset(panoramic_id) push into there else create new panoramic else create new panoramic
 * function remove : isset article id remove article from panoramic else remove panoramic_id and all dependencies
 */
if (!defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function add($options){
        $this->db->where('uid', $options['uid']);
        $query = $this->db->get('safems_user');
        if(count($query->result()) > 0)
            return $query->result();
        $data = array(
            "uid" => $options['uid'],
            "reports" => 0,
            "gcm_reg_id" => $options['gcm_reg_id']
        );
        $this->db->insert('safems_user', $data);
        $this->db->where('uid', $options['uid']);
        $query = $this->db->get('safems_user');
        return $query->result();
    }
    public function report($options){
        if(!isset($options['user_id'])){
            return false;
        }
        $data = array(
            "report"=>1
        );
        $this->db->where('id', $options['id']);
        $query = $this->db->update('safems_user', $data);
        return $query->result();
    }
}
