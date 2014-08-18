<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Devices_Model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function check_auth_device($options){
        return "prout";
        //die();
    }
    public function create_device($options){
        $set_datas = array(
            "user_id"=>$options['user_id'],
            "provider"=>$options['provider'],
            "auth_provider"=>$options['auth_provider'],
            "last_update"=>time()
        );
        $this->db->insert('lv_users_devices', $set_datas);
        return $this->db->insert_id();
    }
    public function update_auth_device($options){
        if(!isset($options['user_id']) or !isset($options['provider'])){
            send_response("error", 400);
        }
        $this->db->where('user_id', $options['user_id']);
        $this->db->where('provider', $options['provider']);
        $user_device = $this->db->get('lv_users_devices')->result_array();
        if(count($user_device) == 0){
            $this->create_device($options);
        }else{
            $this->db->set('auth_provider', $options['auth_provider']);
            $this->db->set('last_update', time());
            $this->db->where('id', $user_device[0]['id']);
            $this->db->update('lv_users_devices');
            return $user_device[0]['id'];
        }
    }
    public function get_auth_device(){

    }
}