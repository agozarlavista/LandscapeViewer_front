<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Articles_Model extends CI_Model{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
	public function add($options){
        $this->db->where('link', strtolower($options['link']));
        $exist = $this->db->get('feed_articles');
        if(count($exist->result()) > 0){
            return $exist->result()[0]->id;
        }
        $data = array(
            'id_source' => $options['id_source'],
            'id_type' => $options['id_type'],
            'info_object' => $options['object'],
            'date' => $options['date'],
            'image_id' => $options['image_id'],
            'link' => $options['link'],
            'title' => $options['title']
        );
		$this->db->insert('feed_articles', $data);

        $article_id = $this->db->insert_id();

        if(isset($options['object'])){
            $tags = Array();
            foreach(json_encode($options['object']).tags as $tag){
                $this->load->model('feed_models/tags_model');
                $tags[] = $this->tags_model->add(Array("label"=>$tag));
            }
            foreach($tags as $tag_id){
                $this->load->model('feed_models/article_tags_model');
                $this->article_tags_model->add(Array("article_id"=>$article_id, "tag_id"=>$tag_id));
            }
        }

		return  $article_id;
    }
	public function remove($options){
		return false;
    }
	public function update($options){
        return false;
    }
	public function get($options){
        if(isset($options['link']))
            $this->db->where('link', $options['link']);
        $this->db->from('feed_articles');
        //$this->db->where('feed_articles.id_type', 33);
        $this->db->order_by("feed_articles.id", "desc");
        $this->db->limit(100,0);
        $this->db->join('feed_media', 'feed_media.id = feed_articles.image_id');
        $this->db->join('feed_sources', 'feed_sources.id = feed_articles.id_source');
        $result = $this->db->get();
		return $result->result();
    }
}