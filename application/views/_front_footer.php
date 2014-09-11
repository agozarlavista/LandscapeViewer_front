
<footer>

</footer>
    <script src="<?php echo base_url(); ?>js/jquery.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/greensock/TweenMax.min.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/greensock/plugins/ScrollToPlugin.min.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/landscape/utilities.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/jquery.form.min.js" type="text/javascript" ></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js" type="text/javascript" charset="utf-8"></script>

    <!-- lv utilities-->
    <script type="text/javascript" src="<?php echo base_url(); ?>js/landscape/lv_ui.js"></script>

    <!--backbones utilities-->
    <script type="text/javascript" src="<?php echo base_url(); ?>js/backbone-utilities/vendor/json2.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/backbone-utilities/vendor/underscore.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/backbone-min.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/landscape/lv_long_press.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/plugins/dropzone.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/plugins/iscroll.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/plugins/tag-it.js"></script>
    <script type="text/javascript" src="<?php echo base_url(); ?>js/landscape/search.js"></script>

    <?php
    if (isset($js)) {
        foreach($js as $js_src) {
            echo '<script type="text/javascript" src="' . base_url() . $js_src . '"></script>'."\n";
        }
    }
    ?>

    <!-- FILE UPLOAD PLUGIN
    <script src="js/landscape/admin.js" type="text/javascript" ></script>
    <script src="./plugins/file_upload/assets/js/jquery.knob.js"></script>
    <script src="./plugins/file_upload/assets/js/jquery.ui.widget.js"></script>
    <script src="./plugins/file_upload/assets/js/jquery.iframe-transport.js"></script>
    <script src="./plugins/file_upload/assets/js/jquery.fileupload.js"></script>
    <script src="./plugins/file_upload/assets/js/script.js"></script>
    END FILE UPLOAD PLUGIN -->

    <script>
        var params = {
            "baseURL" : "<?php echo base_url(); ?>"
        }
        utilities.init(params);
    </script>
</body>
<!-- END BODY -->
</html>