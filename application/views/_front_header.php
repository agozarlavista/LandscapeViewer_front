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
<body>
    <div class="lv_component"></div>
    <header class="red">
        <div class="line logo">
            <img src="<?php echo base_url(); ?>images/assets/logos/logo_white_trsp_405.png" width="405px" alt="logo landscape viewer 2014"/>
        </div>
        <div class="line">
            <span class="baseLine">All your favorites on a page.</span>
        </div>
        <div class="line searchBar">
            <input type="search" placeholder="Search" id="searchInput">
            <div class="searchButton redfont">S</div>
        </div>
        <div class="line center">
            <span class="download_icon"><img src="<?php echo base_url(); ?>images/assets/icon_75.png" alt="landscape viewer app icon" height="50px"/></span><span class="download_links"><a href="apple" class="animated">a</a><a href="google" class="animated">â</a><a href="wp" class="animated">ä</a></span>
            <span class="shortDesc dark">Available on the App Store, Windows Phone and Google Play. Download the App now.</span>
        </div>
    </header>
    <nav id="top_nav">
        <div class="header_logo">
            <img src="<?php echo base_url(); ?>images/assets/logos/landscape_viewer_header_logo.png" height="60px"/>
        </div>
        <ul>
            <li>
                <span class="icon">N</span>Get the app
            </li>
            <li>
                <span class="icon">N</span>Login
            </li>
            <li>
                <span class="icon">f</span>Advenced Search
            </li>
        </ul>
        <div class="refreshBar">
            <div class="progress red"></div>
        </div>
        <div class="filters">
            <ul>
                <li><span class="icon">+</span></li>
                <li><span class="icon">X</span>Filter 1</li>
            </ul>
        </div>
        <div class="refresh_bull">
            <div class="refresh_bull_arrow"></div>
            <span class="refresh_bull_count">
                <!--<span class="icon">R</span>-->
                8
            </span>
        </div>
    </nav>

    <script type="text/template" id="alert_template">
        <div class="title"><%= title %></div>
        <div class="message"><%= message %></div>
        <div class="buttons">
            <div class="content_buttons">
            <% for(var i=0; i<buttons.length; i++){ %>
                <div class="button <%= buttons[i].color %>" id="button_<%= i %>" onclick="lv_ui._callBack(<%= i %>);"><%= buttons[i].label %></div>
            <% } %>
            </div>
        </div>
    </script>