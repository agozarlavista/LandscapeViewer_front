<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "welcome";
$route['admin'] = "admin";
$route['feed'] = "feed_api_v1";

$route['feed/add_type'] = "feed_api_v1/add_type";
$route['feed/edit_type'] = "feed_api_v1/edit_type";
$route['feed/remove_type'] = "feed_api_v1/remove_type";
$route['feed/get_types_list'] = "feed_api_v1/get_types_list";

$route['feed/add_source'] = "feed_api_v1/add_source";
$route['feed/edit_source'] = "feed_api_v1/edit_source";
$route['feed/remove_source'] = "feed_api_v1/remove_source";
$route['feed/get_sources_list'] = "feed_api_v1/get_sources_list";

$route['feed/add_url'] = "feed_api_v1/add_url";
$route['feed/edit_url'] = "feed_api_v1/edit_url";
$route['feed/remove_url'] = "feed_api_v1/remove_url";
$route['feed/get_urls_list'] = "feed_api_v1/get_urls_list";

$route['feed/get_article'] = "feed_api_v1/get_article";
$route['feed/save_image_from_web'] = "feed_api_v1/save_image_from_web";
$route['feed/add_article'] = "feed_api_v1/add_article";
$route['feed/file_upload'] = "feed_api_v1/file_upload";

$route['404_override'] = '';


/* End of file routes.php */
/* Location: ./application/config/routes.php */