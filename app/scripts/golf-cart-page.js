import menuToggleInit from "./lib/menuToggleModule";
import fancyboxInit from "./lib/fancybox";

jQuery(document).ready(function($) {
    menuToggleInit();
    var $activeImage = $('.golf-carts-photos .active');
    cycleImage();
    setInterval(function(){
        cycleImage()
    }, 3500);

    function cycleImage() {
        $('.golf-carts-photos img').removeClass('active');
        var $nextImage = $activeImage.next().length > 0 ? $activeImage.next() : $('.golf-carts-photos img:first');
        $activeImage.addClass('active');
        $activeImage.removeClass('next');
        $activeImage.removeClass('uninvolved');

        $nextImage.addClass('next');
        $nextImage.removeClass('uninvolved');

        $activeImage = $nextImage;
    }




});
