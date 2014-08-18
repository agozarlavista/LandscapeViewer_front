<?php
/**
 * Created by PhpStorm.
 * User: simondelamarre
 * Date: 04/08/2014
 * Time: 18:41
 */
?>
<div class="like_article col_0" id="profile_options">
    <div class="line">
        <div class="avatar"></div>
        Simon
    </div>
    <div class="line">
        <div class="icon">f</div>
        <span class="font_grey">Search Settings</span>
    </div>
    <ul id="user_search_list">
        <!--<li>Press<div class="arrow"></div></li>
        <li>Local News<div class="arrow"></div></li>-->
    </ul>
    <div class="line">
        <div class="icon">P</div>
        <span class="font_grey">Last Panoramics</span>
    </div>
    <ul id="user_panoramic_list">
        <!--<li>panoramic 1<div class="arrow"></div></li>
        <li>panoramic 2<div class="arrow"></div></li>
        <li>panoramic 3<div class="arrow"></div></li>
        <li>panoramic 4<div class="arrow"></div></li>-->
    </ul>
    <div class="line">
        <div class="icon">A</div>
        <span class="font_grey">Friends interests</span>
    </div>
    <div class="line last center">
        <button class="lightButton">
            <span class="icon">N</span>
            Invite Friends
        </button>
    </div>
</div>
<!-- <li> -->
<script type="text/template" id="panoramic_list_template">
    <a href="/page/<%= JSON.parse(utilities.getLocalSession('lv_user'))[0].page_name %>/panoramic/<%= escape(encodeURI(label.split(' ').join('_'))) %>"><%= label %><div class="arrow"></div></a>
</script>
<!-- </li> -->