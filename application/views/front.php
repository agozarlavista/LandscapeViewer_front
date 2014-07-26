    <section id="global_section">
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
<script type="text/template" id="article_template">
        <header style="background:<%= dominante %>; width:<%= width %>px; height:<%= height %>px; background-image:url(<%= url %>);<% if(height==0){ %><%= "display:none;"%><% } %>"></header>
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
    <div class="panoramic_header">
        <label>Panoramic</label>
        <button class="break_panoramic">ù</button>
    </div>
    <div class="container">

    </div>
</script>