<!DOCTYPE html>
<head>
   <meta charset="utf-8" />
   <title>Landscape Viewer</title>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta content="width=device-width, initial-scale=1.0, user-scalable = no" name="viewport" />
   <meta content="" name="description" />
   <meta content="" name="author" />
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black">
   <meta name="MobileOptimized" content="320">
   <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
   <link href="<?php echo base_url(); ?>styles/lv_font/landscapeviewerfont-regular.css" rel="stylesheet" type="text/css"/>
   <link href="<?php echo base_url(); ?>styles/landscape_viewer_color_pack.css" rel="stylesheet" type="text/css"/>
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
    <header class="red">
        <div class="line logo">
            <img src="<?php echo base_url(); ?>images/assets/logos/logo_white_trsp_405.png" width="405px" alt="logo landscape viewer 2014"/>
        </div>
        <div class="line">
            <span class="baseLine">All your favorites on a page.</span>
        </div>
        <div class="line">
            <input type="search" placeholder="Search" id="searchInput">
        </div>
        <div class="line center">
            <span class="download_icon"><img src="<?php echo base_url(); ?>images/assets/icon_75.png" alt="landscape viewer app icon" height="40px"/></span><span class="download_links"><a href="apple" class="animated">a</a><a href="google" class="animated">â</a><a href="wp" class="animated">ä</a></span>
            <span class="shortDesc dark">Available on the App Store, Windows Phone and Google Play. Download the App now.</span>
        </div>
    </header>
    <nav>
        <div class="header_logo">
            <img src="<?php echo base_url(); ?>images/assets/logos/landscape_viewer_header_logo.png"/>
        </div>
        <ul>
            <li>
                <span class="icon">N</span>Get the app
            </li>
            <li>
                <span class="icon">N</span>Login
            </li>
        </ul>
    </nav>
