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
            /*foreach(json_encode($options['object']).tags as $tag){
                $this->load->model('feed_models/tags_model');
                $tags[] = $this->tags_model->add(Array("label"=>$tag));
            }*/
            /*foreach($tags as $tag_id){
                $this->load->model('feed_models/article_tags_model');
                $this->article_tags_model->add(Array("article_id"=>$article_id, "tag_id"=>$tag_id));
            }*/
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
        $this->db->select("feed_articles.id as id, feed_articles.id_source as id_source, feed_articles.id_type as id_type, title, info_object, date, image_id, link, view, liked, feed_media.url, feed_media.dominante, feed_media.width, feed_media.height, feed_sources.label, feed_sources.icon, feed_sources.description, source_media.url as source_icon");

		if(isset($options['id']))
            $this->db->where('feed_articles.id', $options['id']);
        if(isset($options['link']))
            $this->db->where('link', $options['link']);
        if(isset($options['title']))
            $this->db->where('title', $options['title']);
        if(isset($options['search'])){
            foreach($options['search'] as $search){
                $this->db->like('info_object', $search);
                $this->db->like('feed_sources.label', $search);
            }
        }
        $this->db->from('feed_articles');
		//$this->db->where('id_source', 21);
        //$this->db->or_where('feed_articles.id_type', 33);
        //$this->db->or_where('feed_articles.id_type', 35);
        //$this->db->or_where('feed_articles.id_type', 36);
        $this->db->order_by("id", "desc");
        if(!isset($options['limit'])){
            $this->db->limit(100,0);
        }else{
			if(!isset($options['start'])) {
				$this->db->limit($options['limit'], 0);
			}else{
				$this->db->limit($options['limit'], $options['start']);
			}
        }
		// or feed_media.id = 23
        $this->db->join('feed_media', 'feed_media.id = feed_articles.image_id');
        $this->db->join('feed_sources', 'feed_sources.id = feed_articles.id_source');
        $this->db->join('feed_media as source_media', 'source_media.id = feed_sources.icon');
		//$this->db->where('id_source', 21);
        $result = $this->db->get();
		//echo $this->db->last_query();
		return $result->result_array();
    }
    public function add_like($options){
        $this->db->where('user_id', $options['user_id']);
        $this->db->where('article_id', $options['article_id']);
        $canLike = $this->db->get('lv_user_likes');
        $last = $this->db->last_query();
        if(count($canLike->result_array())==0){
            if(isset($options['article_id'])){
                $this->db->where('id', $options['article_id']);
                $this->db->set('liked', 'liked+1', FALSE);
                $this->db->update('feed_articles');
                $like_data = array(
                    "user_id"=>$options['user_id'],
                    "article_id"=>$options['article_id']
                );
                $this->db->insert('lv_user_likes', $like_data);
            }
        }else{
            return array('title'=>'impossible', 'message'=>'already_liked');
        }
    }
    public function add_view($options){
        $this->db->where('user_id', $options['user_id']);
        $this->db->where('article_id', $options['article_id']);
        $canLike = $this->db->get('lv_user_views');
        $last = $this->db->last_query();
        if(count($canLike->result_array())==0){
            if(isset($options['article_id'])){
                $this->db->where('id', $options['article_id']);
                $this->db->set('view', 'view+1', FALSE);
                $this->db->update('feed_articles');
                $view_data = array(
                    "user_id"=>$options['user_id'],
                    "article_id"=>$options['article_id']
                );
                $this->db->insert('lv_user_viewss', $view_data);
            }
        }else{
            return array('title'=>'impossible', 'message'=>'already_viewed');
        }
    }
}