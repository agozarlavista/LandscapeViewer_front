<!DOCTYPE html>
<head>
   <meta charset="utf-8" />
   <title>landscape viewer admin</title>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta content="width=device-width, initial-scale=1.0, user-scalable = no" name="viewport" />
   <meta content="" name="description" />
   <meta content="" name="author" />
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black">
   <meta name="MobileOptimized" content="320">
   <link href="<?php echo base_url(); ?>styles/lv-admin-styles.css" rel="stylesheet" type="text/css"/>
   <link href="<?php echo base_url(); ?>styles/lv-styles.css" rel="stylesheet" type="text/css"/>
    <?php
        if (isset($css)) {
            foreach($css as $file_css) {
                echo '<link href="'.base_url().$file_css.'" rel="stylesheet" type="text/css" />'."\n";
            }
        }
    ?>
    <!-- FILE UPLOAD PLUGIN -->
    <!-- Google web fonts
    <link href="http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700" rel='stylesheet' />
    <link href="plugins/file_upload/assets/css/style.css" rel="stylesheet" />
    END FILE UPLOAD PLUGIN -->


</head>
<body>
<header class="header">
	<a href="admin"><div class="light_button right">Adress manager</div></a>
    <a href="admin"><div class="light_button right">Media manager</div></a>
    <a href="admin"><div class="light_button right">Tags manager</div></a>
    <a href="admin"><div class="light_button right">Refresh all articles</div></a>
</header>