<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Feed_Api_V1 extends CI_Controller {
	public function __construct(){
		parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('X-Frame-Options: DENY');
	}
	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function add_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->add($post);
		echo "added";
		die();
	}
	public function edit_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->update($post);
		echo $result;
		die();
	}
	public function remove_type(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->remove($post);
		echo $result;
		die();
	}
	public function get_types_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/types_model');
		$result = $this->types_model->get($post);
		$this->send_response($result);
		//echo json_encode($result);
	}
	public function add_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->add($post);
		echo "added";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function edit_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->update($post);
		echo "update";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function remove_source(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->remove($post);
		echo "removed";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function get_sources_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/sources_model');
		$result = $this->sources_model->get($post);
		$this->send_response($result);
	}
	public function add_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->add($post);
		echo "added";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function edit_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->update($post);
		echo "update";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function remove_url(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->remove($post);
		echo "removed";
		//var_dump($result);
		//$this->send_response($result);
	}
	public function get_urls_list(){
		$post = $this->input->post();
		$this->load->model('feed_models/urls_model');
		$result = $this->urls_model->get($post);
		$this->send_response($result);
	}
	public function send_response($data){
		//echo "send response";
		//echo json_encode($data);
        $this->output->set_status_header("200");
        //$this->response($data, $httpCode);
        $this->output->set_output(json_encode(array("data"=>$data)));
        return;
	}
    public function get_image_size($img){
        list($width, $height, $type, $attr) = getimagesize($img);
        return Array("width"=>$width, "height"=>$height);
    }
    public function get_dominant($img){
        $rTotal = "";
        $gTotal = "";
        $bTotal = "";
        $total = "";
        $i = "";
        switch(exif_imagetype ( $img ))
        {
            //allowed file types
            case 1:
                $i = imagecreatefromgif($img);
                break;
            case 2:
                $i = imagecreatefromjpeg($img);
                break;
            case 3:
                $i = imagecreatefrompng($img);
                break;
            default:
                die('Unsupported File!'); //output error
        }
        //$i = imagecreatefrompng($img);

        for ($x=0;$x<imagesx($i);$x++) {
            for ($y=0;$y<imagesy($i);$y++) {
                $rgb = imagecolorat($i,$x,$y);
                $r   = ($rgb >> 16) & 0xFF;
                $g   = ($rgb >> 0) & 0xFF;
                $b   = $rgb & 0xFF;

                $rTotal += $r;
                $gTotal += $g;
                $bTotal += $b;
                $total++;
            }
        }

        $rAverage = round($rTotal/$total);
        $gAverage = round($gTotal/$total);
        $bAverage = round($bTotal/$total);
        return $rAverage.','.$gAverage.','.$bAverage;
    }
    public function file_upload(){
        if(isset($_FILES))
        {
            ############ Edit settings ##############
            //$UploadDirectory	= './uploads/'; //specify upload directory ends with / (slash)
            ##########################################

            /*
            Note : You will run into errors or blank page if "memory_limit" or "upload_max_filesize" is set to low in "php.ini".
            Open "php.ini" file, and search for "memory_limit" or "upload_max_filesize" limit
            and set them adequately, also check "post_max_size".
            */

            //check if this is an ajax request
            if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
                die();
            }


            //Is file size is less than allowed size.
            if ($_FILES['file']["size"][0] > 5242880) {
                die("File size is too big!");
            }
            if(is_array($_FILES['file']['type'])){
                //allowed file type Server side check
                switch(strtolower($_FILES['file']['type'][0]))
                {
                    //allowed file types
                    case 'image/png':
                    case 'image/gif':
                    case 'image/jpeg':
                    case 'image/pjpeg':
                    case 'text/plain':
                    case 'text/html': //html file
                    case 'application/x-zip-compressed':
                    case 'application/pdf':
                    case 'application/msword':
                    case 'application/vnd.ms-excel':
                    case 'video/mp4':
                        break;
                    default:
                        die('Unsupported File!'); //output error
                }
                $File_Name          = strtolower($_FILES['file']['name'][0]);
            }else{
                switch(strtolower($_FILES['file']['type']))
                {
                    //allowed file types
                    case 'image/png':
                    case 'image/gif':
                    case 'image/jpeg':
                    case 'image/pjpeg':
                    case 'text/plain':
                    case 'text/html': //html file
                    case 'application/x-zip-compressed':
                    case 'application/pdf':
                    case 'application/msword':
                    case 'application/vnd.ms-excel':
                    case 'video/mp4':
                        break;
                    default:
                        die('Unsupported File!'); //output error
                }
                $File_Name          = strtolower($_FILES['file']['name']);
            }
            $File_Ext           = substr($File_Name, strrpos($File_Name, '.')); //get file extention
            $Random_Number      = uniqid().time(); //Random number to be added to name.
            $NewFileName 		= $Random_Number.$File_Ext; //new file name

            $dirArray = str_split($NewFileName, 1);
            if(! is_dir('./uploads/'.$dirArray[0] . "/"))
                mkdir("./uploads/" . $dirArray[0] . "/", 0777);
            if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/"))
                mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/", 0777);
            if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/"))
                mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/", 0777);
            if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/"))
                mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/", 0777);

            $UploadDirectory = "./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/";
            if(is_array($_FILES['file']['tmp_name']))
                $moved = $_FILES['file']['tmp_name'][0];
            else
                $moved = $_FILES['file']['tmp_name'];
            if(move_uploaded_file($moved, $UploadDirectory.$NewFileName ))
            {
                $options = Array(
                    "url" => $UploadDirectory.$NewFileName,
                    "dominante" => 'rgb('.$this->get_dominant($UploadDirectory.$NewFileName).')',
                    "width" => $this->get_image_size($UploadDirectory.$NewFileName)['width'],
                    "height" => $this->get_image_size($UploadDirectory.$NewFileName)['height']
                );
                $this->load->model('feed_models/medias_model');
                $result = $this->medias_model->add($options);

                $this->save_image_thumb($UploadDirectory.$NewFileName, 50, $NewFileName);
                $this->save_image_thumb($UploadDirectory.$NewFileName, 75, $NewFileName);
                $this->save_image_thumb($UploadDirectory.$NewFileName, 100, $NewFileName);
                $this->save_image_thumb($UploadDirectory.$NewFileName, 200, $NewFileName);
                die(json_encode(Array("code"=>200, "id"=>$result)));
            }else{
                die('error uploading File!');
            }

        }
        else
        {
            die('Something wrong with upload! Is "upload_max_filesize" set correctly?');
        }
    }
    public function save_image_from_web($options = null){
        $options = $this->input->post();
        //$options
        if(!isset($options['image_url'])){
            echo "you must define image uri";
            return "error";
        }

        $img_to_upload = $options['image_url'];

        $imageName = time().uniqid();
        //die();
        //http://www.zeutch.com/wp-content/uploads/2014/07/Comfort_Food_Jessica_Dance_001.jpg
        $this->save_image_thumb($img_to_upload, 400, $imageName);
        $this->save_image_thumb($img_to_upload, 250, $imageName);
        $this->save_image_thumb($img_to_upload, 100, $imageName);

        //create feed_media dominante width height
        $dirArray = str_split($imageName, 1);
        $UploadDirectory = "./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/";
        $realURI = $UploadDirectory.$imageName.'_400.png';
        $options = Array(
            "url" => $realURI,
            "dominante" => 'rgb('.$this->get_dominant($realURI).')',
            "width" => $this->get_image_size($realURI)['width'],
            "height" => $this->get_image_size($realURI)['height']
        );
        $this->load->model('feed_models/medias_model');
        $result = $this->medias_model->add($options);
        //$response = json_encode(Array("code"=>200, "id"=>$result));
        //echo $response;
        die(json_encode(Array("code"=>200, "id"=>$result)));
    }
    public function save_image_thumb($img, $w, $imgName){
        $filename = $img;
        header('Content-Type: image/jpeg');
        $img_name = basename($img);
        list($width, $height) = getimagesize($filename);
        $percent = ($w * 100)/$width;

        $newwidth = $w;
        $newheight = $height * ($percent/100);

        $thumb = imagecreatetruecolor($newwidth, $newheight);
        $source = "";
        switch(exif_imagetype ( $filename ))
        {
            //allowed file types
            case 1:
                $source = imagecreatefromgif($filename);
                break;
            case 2:
                $source = imagecreatefromjpeg($filename);
                break;
            case 3:
                $source = imagecreatefrompng($filename);
                break;
            default:
                die('Unsupported File!'); //output error
        }

        imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        $new_img_name = $imgName . '_' . $w;
        //explode('.',basename($img))[0] . '_' . $w;

        $dirArray = str_split($new_img_name, 1);
        if(! is_dir('./uploads/'.$dirArray[0] . "/"))
            mkdir("./uploads/" . $dirArray[0] . "/", 0777);
        if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/"))
            mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/", 0777);
        if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/"))
            mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/", 0777);
        if(! is_dir('./uploads/'.$dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/"))
            mkdir("./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/", 0777);

        $UploadDirectory = "./uploads/" . $dirArray[0] . "/" . $dirArray[1] . "/" . $dirArray[2] . "/" . $dirArray[3] . "/";

        $new_img = imagepng($thumb, $UploadDirectory.$new_img_name.'.png');
    }
    public function add_article(){
        $options = $this->input->post();
        $this->load->model('feed_models/articles_model');
        $article_id = $this->articles_model->add($options);
        return json_encode(Array("code"=>200, "article_id"=>$article_id));
    }
    public function get_article(){
        $options = $this->input->post();
        $this->load->model('feed_models/articles_model');
        $list = $this->articles_model->get($options);
        $this->send_response(Array("code"=>200, "data"=>$list));
        //die(json_encode(Array("code"=>200, "data"=>$list)));
    }
}