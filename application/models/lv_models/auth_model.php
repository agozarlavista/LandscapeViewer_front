<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Auth_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
        if(!isset($options['page_name']) or !isset($options['email']) or !isset($options['password']))
            return 401;
        $this->db->where('page_name', strtolower($options['page_name']));
        $exist = $this->db->get('lv_users');
        if(count($exist->result()) > 0)
            return array("message"=>array("title"=>"already exist", "message"=>"this page already exist, choose another page name"));
        $data = array(
            "auth_token" => sha1($options['password']),
            "token_secret" => md5($options['password']),
            "creation_date" => time()
        );
        if(isset($options['page_name']))
            $data['page_name'] = $options['page_name'];
        if(isset($options['fb_id']))
            $data['fb_id'] = $options['fb_id'];
        if(isset($options['tw_id']))
            $data['tw_id'] = $options['tw_id'];
        if(isset($options['email']))
            $data['email'] = $options['email'];
        if(isset($options['password']))
            $data['password'] = sha1($options['password']);
        if(isset($options['pseudo']))
            $data['pseudo'] = $options['pseudo'];
        if(isset($options['auth_provider']))
            $data['auth_provider'] = $options['auth_provider'];

        $this->db->insert('lv_users', $data);
        $dataUser = $this->get(array("email"=>$data['email'], "password"=>$options['password']));
        return $dataUser;
		//$this->auth($options);
        //$returnedc = $query->result_array();
        //return $query->result_array();
        //return $this->db->result_array();
    }
	public function remove($options){
		if (isset($options['id']))
            $this->db->delete('lv_users', array('id' => intval($options['id'])));
        return null;
    }
	public function update($options){
        if(!isset($options['id']))
            return 401;
		$data = array();

        if(!isset($options['pseudo']))
            $data['pseudo'] = $options['pseudo'];
        if(!isset($options['fb_id']))
            $data['fb_id'] = $options['fb_id'];
        if(!isset($options['tw_id']))
            $data['tw_id'] = $options['tw_id'];
        if(!isset($options['password']))
            $data['password'] = sha1($options['password']);
        $data['last_connexion'] = new DateTime();

        $this->db->where("id", $options['id']);
		$query = $this->db->update('lv_users', $data);
		return $query->result_array();
    }
	public function get($options){
        $this->db->select('id, fb_id, tw_id, email, pseudo, page_name, avatar_id, auth_token, creation_date');
        if(isset($options['id']))
            $this->db->where('id', $options['id']);
        if(isset($options['search'])){
            $search = explode(" ", $options['search']);
            foreach ($search as $search_ar){
                $this->db->like('pseudo', $search_ar);
                $this->db->like('page_name', $search_ar);
            }
        }

        if(isset($options['email']))
            $this->db->where('email', $options['email']);
        if(isset($options['pseudo']))
            $this->db->where('pseudo', $options['pseudo']);
        if(isset($options['page_name']))
            $this->db->where('page_name', $options['page_name']);
        if(isset($options['password']))
            $this->db->where('password', sha1($options['password']));

        if(isset($options['limit'])){
            if(isset($options['offset']))
                $this->db->limit($options['limit'], $options['offset']);
            else
                $this->db->limit($options['limit']);
        }
		$query = $this->db->get('lv_users');
		return $query->result_array();
    }
}