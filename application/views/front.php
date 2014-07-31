    <section id="global_section">
        <article class="col_0" id="profile_options">
            <div class="line">
                <div class="avatar"></div>
                Simon
            </div>
            <div class="line">
                <div class="icon">f</div>
                <span class="font_grey">Search Settings</span>
            </div>
            <ul>
                <li>Press<div class="arrow"></div></li>
                <li>Local News<div class="arrow"></div></li>
            </ul>
            <div class="line">
                <div class="icon">P</div>
                <span class="font_grey">Last Panoramics</span>
            </div>
            <ul>
                <li>panoramic 1<div class="arrow"></div></li>
                <li>panoramic 2<div class="arrow"></div></li>
                <li>panoramic 3<div class="arrow"></div></li>
                <li>panoramic 4<div class="arrow"></div></li>
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
        </article>
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
        <div class="footer">
            <button class="lightButton">
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
        <button class="button">1</button>
        <button class="button">2</button>
        <button class="button">3</button>
        <button class="button">A</button>
    </div>
    <header style="background:<%= dominante %>; width:<%= width %>px; height:<%= height %>px; <% if(height==0){ %><%= "display:none;"%><% } %>" data-ground="<%= url %>">
        <div class="image_header"></div>
    </header>
    <div class="title"><%= title %></div>
    <div class="short_text"><%= short_desc %></div>
    <div class="infos">
        <div class="liked"><span class="icon">A</span>2305</div>
        <div class="viewed"><span class="icon">É</span>45009</div>
    </div>
    <div class="source">
        <div class="thumb" style="background-image:url(<%= icon %>);"></div>
        <div class="label"><%= label %></div>
        <div class="date"><%= new Date(parseInt(date)).toLocaleString() %></div>
    </div>
</script>
<script type="text/template" id="panoramic_template">
    <div class="selected_frame">
        <div class="selected_icon" onclick="$(this).parent().css('display', 'none');">û</div>
        <div class="selected_icon">h</div>
    </div>
    <div class="panoramic_header">
        <input type="text" placeholder="panoramic"/>
        <button class="panoramic_header_button">ù</button>
        <button class="panoramic_header_button">o</button>
    </div>
    <div class="container">
    </div>
    <div class="panoramic_footer">
        <button class="panoramic_footer_button">P</button>
    </div>
</script>
    <!--<div class="thumb"></div>
    <div class="thumb"></div>-->