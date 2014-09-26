    <section class="fullscreen_view" id="article_view">
        <article>
            <div class="wrapper">
                <div class="scroller">
                </div>
            </div>
        </article>
        <div class="ground"></div>
    </section>
    <section class="fullscreen_view" id="panoramic_view">

    </section>
    <section id="global_section">
        <?php
        if($session != false){
            $this->load->view('user_infos', $user_infos);
        }
        ?>
        <!--<article id="">
            <header style="background:#98BB82;"></header>
            <div class="title">Article 1</div>
            <div class="short_text">short description lorem ipsum estis siempre de setum cordabys coleria kinetics gulio.</div>
            <div class="infos">
                <div class="liked"><span class="icon">A</span>2305</div>
                <div class="viewed"><span class="icon">É</span>45009</div>
            </div>
            <div class="source">
                <div class="thumb"></div>
                <div class="label">LeMonde</div>
                <div class="date">Hier à 18 heure</div>
            </div>
        </article>-->
    </section>
    <div class="refresh_bottom">
        <div class="bar red"></div>
    </div>
    <div class="panoramic_drop_zone">
        <div class="zone">P</div>
        <div class="line">
            <input type="text" id="drop_zone_label" placeholder="panoramic name"/>
        </div>
        <div class="footer">
            <button class="lightButton" id="drop_zone_save_button">
                <span class="icon">N</span>
                save
            </button>
        </div>
    </div>
<script type="text/template" id="article_template">
    <div class="selected_frame">
        <div class="selected_icon" onclick="$(this).parent().css('display', 'none');">û</div>
        <div class="selected_icon">h</div>
    </div>
    <div class="article_header_menu">
        <button class="button" id="pinterest_share_article">1</button>
        <button class="button" id="twitter_share_article">2</button>
        <button class="button" id="fb_share_article">3</button>
        <button class="button" id="like_article" onClick="public_api.addArticleLike(<%= id %>)">A</button>
    </div>
    <header style="background:<%= dominante %>; width:<%= width %>px; height:<%= height %>px; <% if(height==0){ %><%= "display:none;"%><% } %>" data-ground="<%= url %>">
        <div class="image_header"></div>
    </header>
    <div class="title"><%= title %></div>
    <div class="short_text"><%= short_desc %></div>
    <div class="infos">
        <div class="liked"><span class="icon">A</span><%= liked %></div>
        <div class="viewed"><span class="icon">É</span><%= view %></div>
    </div>
    <div class="source">
        <div class="thumb" style="background-image:url(<%= source_icon %>);"></div>
        <div class="label"><%= label %></div>
        <div class="date"><%= new Date(parseInt(date)).toLocaleString() %></div>
    </div>
</script>
<script type="text/template" id="panoramic_template">
    <div class="selected_frame">
        <div class="selected_icon" id="break_link"onclick="$(this).parent().css('display', 'none'); $(this).parent().parent().removeClass('selected_article');">û</div>
        <div class="selected_icon" id="linked">h</div>
    </div>
    <div class="panoramic_header">
        <input type="text" placeholder="panoramic" id="label"/>
        <button class="panoramic_header_button">ù</button>
        <button class="panoramic_header_button">o</button>
    </div>
    <div class="container">
    </div>
    <div class="panoramic_footer">
        <button class="panoramic_footer_button" id="create_panoramic">P</button>
    </div>
</script>
    <!--<div class="thumb"></div>
    <div class="thumb"></div>-->