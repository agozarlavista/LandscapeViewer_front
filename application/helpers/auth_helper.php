<?php
function check_auth(){
     $result = 'result from common_function()';
     return $result;
}
function authenticate($params){
    //have to check user auth before return true or false;
    $CI =& get_instance();
    $CI->lang->load('auth', 'en');
    if(!isset($params['user_id'])){
        send_response(array("title"=>$CI->lang->line('AUTH_NOT_LOGED_TITLE'), "message"=>$CI->lang->line('AUTH_NOT_LOGED')), "400");
        return false;
    }
    if(!isset($params['auth_token'])){
        send_response(array("title"=>$CI->lang->line('AUTH_INVALID_TOKEN_TITLE'), "message"=>$CI->lang->line('AUTH_INVALID_TOKEN')), "400");
        return false;
    }
    $CI->load->model('lv_models/auth_model');
    if($CI->_user_id){
        if($CI->auth_model->valid_session(array('user_id'=>$CI->_user_id, "auth_token"=>$params['auth_token']))){
            return true;
        }
    }
    $users = $CI->auth_model->get(array('email'=>$params['email'], 'password'=>$params['password'], 'auth_token'=>$params['auth_token'], 'token_secret'=>$params['token_secret']));
    if(count($users) > 1){
        send_response(array("title"=>$CI->lang->line('AUTH_USER_BIG_PROBLEM_TITLE'), "message"=>$CI->lang->line('AUTH_USER_BIG_PROBLEM')), "400");
        return false;
    }
    if(count($users) != 1){
        send_response(array("title"=>$CI->lang->line('AUTH_USER_NOT_FOUND_TITLE'), "message"=>$CI->lang->line('AUTH_USER_NOT_FOUND')), "400");
        return false;
    }
    return true;
}
function check_session(){
    $this->load->library('session');
    var_dump($this->session->userdata('lv_user'));
}
function send_response($data, $httpCode){
    $CI =& get_instance();
    $CI->load->library('session');
    $returned_datas = array();
    $returned_datas['data'] = $data;
    if($CI->_auth_mandatory){
        $new_auth = set_auth_token(array('user_id'=>$CI->_user_id));
        $returned_datas['access'] = array('AUTH_TOKEN'=>$new_auth);
        $CI->session->userdata('lv_access', array('AUTH_TOKEN'=>$new_auth));
    }
    $CI->output->set_status_header($httpCode);
    //$this->response($data, $httpCode);
    $CI->output->set_output(json_encode($returned_datas));
    return;
}
function set_auth_token($options){
    $CI =& get_instance();
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < 10; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    $auth_token = hash('sha256', $randomString);

    $CI->load->model('lv_models/devices_model');
    //on set l'auth_token sur l'auth_provider du user
    $provider_id = $CI->devices_model->update_auth_device(
        array(
            "user_id"       =>  $options['user_id'],
            "provider"      =>  $_SERVER['HTTP_USER_AGENT'],
            "auth_provider" =>  $auth_token
        )
    );
    $CI->db->where('id', $options['user_id']);
    $CI->db->set('auth_token', $auth_token);
    $CI->db->set('auth_provider', $provider_id);
    $CI->db->set('last_connexion', time());
    $CI->db->update('lv_users');
    return $auth_token;
}