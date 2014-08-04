<!DOCTYPE html>
<head>
   <meta charset="utf-8" />
   <title>Landscape Viewer</title>
   <link rel="icon" type="image/png" href="images/assets/icon_75.png" />
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta content="width=device-width, initial-scale=1.0, user-scalable = no" name="viewport" />
   <meta content="All your favorites on a page" name="description" />
   <meta content="Simon Delamarre, creative front end developer" name="author" />
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black">
   <meta name="MobileOptimized" content="320">
   <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
   <link href="<?php echo base_url(); ?>styles/lv_font/landscapeviewerfont-regular.css" rel="stylesheet" type="text/css"/>
   <link href="<?php echo base_url(); ?>styles/landscape_viewer_color_pack.css" rel="stylesheet" type="text/css"/>
   <link href="<?php echo base_url(); ?>styles/lv-styles.css" rel="stylesheet" type="text/css"/>
   <link href="<?php echo base_url(); ?>styles/lv_ui.css" rel="stylesheet" type="text/css"/>
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
<body class="red">
    <div class="lv_component"></div>
    <nav id="top_nav">
        <div class="header_logo">
            <img src="<?php echo base_url(); ?>images/assets/logos/landscape_viewer_header_logo.png" height="60px"/>
        </div>
        <ul>
            <li>
                <span class="icon">N</span>Get the app
            </li>
            <!--<li>
                <span class="icon">N</span>Login
            </li>
            <li>
                <span class="icon">f</span>Advenced Search
            </li>-->
        </ul>
    </nav>