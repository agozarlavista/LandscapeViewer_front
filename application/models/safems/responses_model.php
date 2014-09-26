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

class Request_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function add($options){
        $this->db->where('id', $options['user_id']);
        $query = $this->db->get('safems_user');
        if(count($query->result()) > 0)
            return false;
        
        $data = array(
            "user_id" => $options['user_id'],
            "message" => $options['message'],
            "theme" => $options['theme']
        );
        $query = $this->db->insert('safems_request', $data);
        return $query->result();
    }
    public function delete($options){

    }
}
