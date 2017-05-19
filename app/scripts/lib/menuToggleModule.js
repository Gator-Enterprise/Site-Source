export default function(){
    $('#menu-toggle').click(function(){
        $(this).toggleClass('is-active');
        if( $(this).hasClass('is-active') ){
            $('.mobile-menu-items').addClass('show');
        } else {
            $('.mobile-menu-items').removeClass('show');
        }
    });
}