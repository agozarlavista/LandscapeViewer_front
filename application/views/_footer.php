	<footer>
	</footer>
	<script src="<?php echo base_url(); ?>js/jquery.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/greensock/TweenMax.min.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/landscape/utilities.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/landscape/admin.js" type="text/javascript" ></script>
    <script src="<?php echo base_url(); ?>js/jquery.form.min.js" type="text/javascript" ></script>

    <!-- FILE UPLOAD PLUGIN
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
        admin.init();
    </script>
</body>
<!-- END BODY -->
</html>