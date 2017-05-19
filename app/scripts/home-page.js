import menuToggleInit from "./lib/menuToggleModule";

jQuery(document).ready(function($) {
    menuToggleInit();


    // load fb page
    (function(d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    // allow the fb timeline widget to deal with page reflows on resize
    let oldwidth = $(window).width();
    let timeout;

    let recalc = function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            let container_width = $('#timeline').width();
            $('#timeline').html('<div class="fb-page" ' +
                'data-href="https://www.facebook.com/GatorEnterprise/"' +
                ' data-width="' + container_width + '" data-height="640" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-tabs="timeline"><div class="fb-xfbml-parse-ignore"><blockquote cite="Yhttps://www.facebook.com/GatorEnterprise/"><a href="https://www.facebook.com/GatorEnterprise/">Gator Enterprise</a></blockquote></div></div>');
            if(typeof FB !== 'undefined') {
                FB.XFBML.parse( );
            }
        }, 100);
    };

    recalc();

    $(window).bind("resize", function(){
        if( oldwidth !== $(window).width()) {
            recalc();
            oldwidth = $(window).width();
        }
    });


    // remove timeline container if fb fails to load
    setTimeout(function() {
        if ( $('.fb-xfbml-parse-ignore').length > 0 ) {
            let $map = $(' <div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.268094605106!2d-92.43631268456063!3d41.822524879226606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e580c8d01e26d9%3A0xcc7661de3a7a3430!2s1786+328th+Ave%2C+Brooklyn%2C+IA+52211!5e0!3m2!1sen!2sus!4v1488402633047" frameborder="0" style="border:0" allowfullscreen></iframe></div>');

            $('#timeline').remove();
            $('.home-content').prepend($map);
            $('.location-info .map').remove();

        }
    }, 3500);

});