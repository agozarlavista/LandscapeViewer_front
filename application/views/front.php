    <div class="fullscreen_view" id="article_view">
    </div>
    <div class="fullscreen_view" id="panoramic_view">

    </div>
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
<script type="text/template" id="article_detail_template">
	<div class="wrapper">
		<div class="scroller">
			<div class="prev_button"><div class="icon"><</div><div class="title_button">retour</div></div>
			<div class="close_button"><div class="icon">X</div><div class="title_button">fermer</div></div>
			<div style="width:<%= width %>px; height:<%= height %>px; background-size:cover; background-image:url(<%= url %>);display:none;" id="article_image"/>
			<div class="article_diaporama" id="article_diaporama">
				<div class="diaporama">
					<div class="content_screens" id="content_screens_diaporama">
						<% for(var i=0; i<realDatas.images.length; i++){ %>
							<div class="slide" id="slide_<%= i %>">
								<% if (i == 0){ %>
									<img src="<%= realDatas.images[i] %>" data-image="<%= realDatas.images[i] %>" height="100%"/>
								<% }else{ %>
									<img src="" data-image="<%= realDatas.images[i] %>" height="100%"/>
								<% } %>
							</div>
						<% } %>
					</div>
				</div>
				<div class="content_li">
					<ul class="diaporama_navigation" style="width:<%= (realDatas.images.length*35) %>px;">
						<% for(var i=0; i<realDatas.images.length; i++){ %>
							<li id="diapo_<%= i %>" data-slide="<%= i %>"></li>
						<% } %>
					</ul>
				</div>
			</div>
			<div class="content_article">
				<div class="left_col">
					<div class="line title lightgrey"><%= title %></div>
					<div class="line description lightgrey"><%= realDatas.content %></div>
					<div class="line title">
						<span class="icon">R</span>
						<span><%= realDatas.videos.length %> médias supplémentaires</span>
					</div>
					<div class="line source">
						<div class="logo"></div>
						<div class="source_name"><%= description %></div>
					</div>
					<div class="line publication_date">
						<span>publié le <%= new Date(realDatas.publishedDate) %></span>
					</div>
					<div class="line lightgrey">
						<div class="classic_button">
							<span class="icon">ô</span>
							<span>Ajouter à un panoramic</span>
						</div>
						<div class="classic_button">
							<span class="icon">h</span>
							<span>Source</span>
						</div>
					</div>
					<div class="line title">
						<span class="icon">W</span>
						<span>Commentaires</span>
						<span class="number"></span>
					</div>
				</div>
				<div class="right_col">
					<div class="line sharing_links lightgrey">
						<div class="classic_button"><span class="icon">2</span></div>
						<div class="classic_button"><span class="icon">3</span></div>
						<div class="classic_button"><span class="icon">7</span></div>
					</div>
					<div class="line stats">
						<div class="likes">
							<span class="stat_icon">Ä</span>
							<span class="stat_number">567</span>
						</div>
						<div class="break_likes">
							<span class="stat_icon">À</span>
							<span class="stat_number">67</span>
						</div>
						<div class="views">
							<span class="stat_icon">V</span>
							<span class="stat_number">2K</span>
						</div>
					</div>
					<div class="line title">
						<span class="icon">P</span>
						<span>8 Panoramics</span>
					</div>
					<div class="line panoramics middlegrey">
						<div class="panoramic_button">
							<div class="picture"></div>
							<div class="title">test title</div>
							<div class="show_button"><span class="icon">V</span>Voir</div>
						</div>
						<div class="panoramic_button">
							<div class="picture"></div>
							<div class="title">test title</div>
							<div class="show_button"><span class="icon">V</span>Voir</div>
						</div>
						<div class="panoramic_button">
							<div class="picture"></div>
							<div class="title">test title</div>
							<div class="show_button"><span class="icon">V</span>Voir</div>
						</div>
						<div class="line_down_button">
							<span>Voir les panoramics contenant cet article.</span>
						</div>
					</div>
					<div class="line title">
						<span class="icon">J</span>
						<span>128 Articles similaires</span>
					</div>
					<div class="line articles middlegrey">
						<div class="article_button">
							<div class="picture"></div>
							<div class="label"></div>
							<div class="article_source">
								<div class="logo"></div>
								<div class="name"></div>
							</div>
						</div>
						<div class="line_down_button">
							<span>Voir les articles similaires</span>
						</div>
					</div>
					<div class="line title">
						<span class="icon">t</span>
						<span>Tags</span>
					</div>
					<div class="line tags lightgrey">
						<% for(var i=0; i<realDatas.categories.length; i++){ %>
							<div class="tag"><%= realDatas.categories[i] %></div>
						<% } %>
					</div>
				</div>
			</div>
		</div>
	</div>
</script>
    <!--<div class="thumb"></div>
    <div class="thumb"></div>-->