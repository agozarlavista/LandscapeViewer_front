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

class Panoramic_Model extends CI_Model{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function add($options){

    }
    public function remove($options){

    }
    public function update($options){

    }
    public function get($options){
        if(!isset($options['panoramic_id']))
            return 401;
        $this->db->select('lv_panoramic.id as panoramic_article_id, panoramic_id, feed_articles.id_source, feed_articles.id_type, feed_articles.title, feed_articles.info_object, feed_articles.date, feed_articles.image_id, feed_articles.link');
        $this->db->where('panoramic_id', $options['panoramic_id']);
        $this->db->join('feed_articles', 'feed_articles.id = panoramic_id.article_id');
        if(isset($options['limit'])){
            if(isset($options['offset']))
                $this->db->limit($options['limit'], $options['offset']);
            else
                $this->db->limit($options['limit']);
        }
        $query = $this->db->get('lv_panoramic');
        return $query->result_array();
    }
}
