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

class Panoramics_model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function add($options){
        if(!isset($options['user_id']) or !isset($options['label']) or !isset($options['articles']) or !is_array($options['articles']))
            return 401;

        $data = array();
        $data['user_id'] = $options['user_id'];
        $data['label'] = $options['label'];
        if(isset($options['description']))
            $data['description'] = $options['description'];

        $this->db->insert('lv_panoramic', $data);
        $insert_id = $this->db->insert_id();
        foreach($options['articles'] as $_art){
            $dataContent = array();
            $dataContent['panoramic_id'] = $insert_id;
            $dataContent['article_id'] = $_art;
            $this->db->insert('lv_panoramic_article', $dataContent);
        }
        // perhaps we have to check panoramic and send a $this->get()
        return array("message"=>array("tittle"=>"success", "message"=>"panoramic created"));
    }
    public function remove($options){
        if (isset($options['panoramic_id']))
            $this->db->delete('lv_panoramic', array('id' => intval($options['panoramic_id'])));
        if (isset($options['panoramic_id']))
            $this->db->delete('lv_panoramic_article', array('panoramic_id' => intval($options['panoramic_id'])));
        return null;
    }
    public function update($options){
        if(!isset($options['panoramic_id']))
            return 401;
        $data = array();
        if(isset($options['label']))
            $data['label'] = $options['label'];
        if(isset($options['description']))
            $data['description'] = $options['description'];
        if(isset($options['articles']) && is_array($options['articles'])){
            foreach($options['articles'] as $_art){
                $dataContent = array();
                $dataContent['panoramic_id'] = $options['panoramic_id'];
                $dataContent['article_id'] = $_art;
                $this->db->insert('lv_panoramic_article', $dataContent);
            }
        }
        $this->db->where('id', $options['panoramic_id']);
        $query = $this->db->update('lv_panoramic', $data);
        return $query->result_array();
    }
    public function get($options){
        //lv_panoramic_article.article_id,
        $this->db->select('lv_panoramic.id as id, label, description, COUNT(lv_panoramic.id) as total');
        if(isset($options['panoramic_id']))
            $this->db->where('id', $options['panoramic_id']);
        if(isset($options['user_id']))
            $this->db->where('user_id', $options['user_id']);
        if(isset($options['search'])){
            $search = explode(" ", $options['search']);
            foreach ($search as $search_ar){
                $this->db->like('label', $search_ar);
                $this->db->like('description', $search_ar);
            }
        }
        /*if(isset($options['limit'])){
            if(isset($options['offset']))
                $this->db->limit($options['limit'], $options['offset']);
            else
                $this->db->limit($options['limit']);
        }*/
        $this->db->join('lv_panoramic_article', 'lv_panoramic.id = lv_panoramic_article.panoramic_id');
        $this->db->group_by('lv_panoramic.id');
        $query = $this->db->get('lv_panoramic');
        //$lastquery = $this->db->last_query();
        return $query->result_array();
    }
}
