<section>
    <div class="formular absolute" id="login">
        <div class="logo">
            L
        </div>
        <div class="line">
            <button class="lightButton">
                <span class="icon">3</span>
                Facebook Connect
            </button><br/>
            <button class="lightButton">
                <span class="icon">2</span>
                Twitter Connect
            </button>
        </div>
        <div class="line">
            <label for="email">email</label>
            <input type="email" placeholder="email" id="email"/>
        </div>
        <div class="line">
            <label for="pwd">Password</label>
            <input type="password" placeholder="password" id="pwd"/>
        </div>
        <button class="lightButton" id="login_action">
            <span class="icon">N</span>
            Login
        </button>
        <button class="lightButton" data-page="register">
            <span class="icon">N</span>
            Register
        </button>
        <br/>
        <a href="javascript:void(0)" class="hyper_link" data-page="lost_password">lost your password</a>
    </div>
    <div class="formular absolute" id="register">
        <div class="logo">
            L
        </div>
        <div class="line">
            <div class="drop_zone_avatar" id="drop_zone_avatar"></div>
        </div>
        <div class="line">
            <label for="pseudo">Uniq Id</label>
            <input type="text" placeholder="enter you page name" id="lv_id"/>
            <p class="infos">* Use your real identity</p>
        </div>
        <div class="line">
            <label for="email">Email</label>
            <input type="email" placeholder="email" id="email"/>
            <p class="infos">* A confirmation email will be sent</p>
        </div>
        <div class="line">
            <label for="pwd">Password</label>
            <input type="password" placeholder="password" id="pwd"/>
            <p class="infos">* Six more characters</p>
        </div>
        <button class="lightButton" id="register_action">
            <span class="icon">N</span>
            Register
        </button>
        <br/>
        <a href="javascript:void(0)" class="hyper_link" data-page="lost_password">lost your password</a>
    </div>
    <div class="formular absolute" id="lost">
        <div class="logo">
            L
        </div>
        <div class="line">
            <label for="email">Email</label>
            <input type="email" placeholder="email" id="email"/>
        </div>
        <button class="lightButton">
            <span class="icon" id="lost_action">N</span>
            Request new password
        </button>
    </div>
</section>